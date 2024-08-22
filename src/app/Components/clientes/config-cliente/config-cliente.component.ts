import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';

import { IonicModule } from '@ionic/angular';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators,} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/Interfaces/cliente';
import { User } from 'src/app/Interfaces/usuario';

import { ClientesService } from 'src/app/Services/clientes/clientes.service';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { EquiposService } from 'src/app/Services/equipos/equipos.service';
import { Category } from 'src/app/Interfaces/category-equip';
import { OrganizationService } from 'src/app/Services/organization/organization.service';
import { Organization } from 'src/app/Interfaces/organization';
@Component({
  standalone: true,
  selector: 'app-config-cliente',
  templateUrl: './config-cliente.component.html',
  styleUrls: ['./config-cliente.component.scss'],
  imports: [MatAutocompleteModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, AsyncPipe, 
    MatTableModule, IonicModule]
})
export class ConfigClienteComponent  implements OnInit {

  displayedColumns: string[] = ['name', 'delete'];
  
  dataSource:any

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  type: string = ''

  usuariosClientes: User[] = []
  organizationUsers: User[] = []

  equiposClientes: Category[] = []
  organizationCategory: Category[] = []

  usuarios: any[] = []

  cliente: Cliente = { id: 0, nombre: '', telefono_jefe_area: '', telefono_supervisor_area: '', usuarios: [], equipos: [] };
  organization!: any;

  constructor(private route: ActivatedRoute, private clientes:ClientesService, private usuariosGlobales:UsuariosService, private _equipos:EquiposService, private organizationService: OrganizationService) {

    
  }

  async ngOnInit() {

    const dataUser = await this.usuariosGlobales.getUsers();
    this.usuarios = dataUser.data;
    console.log(this.usuarios)

    let organizationId

    this.route.paramMap.subscribe(params => {
      organizationId = params.get('cliente')!;
    });

    this.route.paramMap.subscribe(params => {
      this.type = params.get('type')!;
    });

    const response = await this.organizationService.findOrganization(parseInt(organizationId!, 10));
    const foundOrganization = response.data[0]

    if (foundOrganization){
      this.organization = foundOrganization
      console.log(this.organization)
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    await this.loadData();
  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();
    
    if(this.type == 'usuarios'){
      const usernameUsuario = this.usuarios.map(user => user.userName);
      return usernameUsuario.filter(option => option.toLowerCase().includes(filterValue));
    }

    if(this.type == 'equipos'){
      const nameEquipo = this._equipos.listEquipos().map(equip => equip.name);
      return nameEquipo.filter(option => option.toLocaleLowerCase().includes(filterValue))
    }

    return []
  }

  async onOptionSelectedUser(event: any) {
   
    const selectedUsername = event.option.value;
   
    const selectedUser = this.usuarios.find(user => user.userName === selectedUsername);
   
    if (selectedUser) {
      const organizacionId = this.organization?.id;
     
      if (organizacionId) {

        const response = await this.organizationService.assignUserToOrganization(selectedUser.id, this.organization.id);
        console.log(response)
        this.loadDataUsuario(); // Asegúrate de llamar a loadDataCliente después de agregar el usuario
        this.myControl.reset()
      }
    }
  }

  onOptionSelectedEquip(event: any) {
    const selectedEquipName = event.option.value;
    console.log(selectedEquipName)
    const selectedEquip = this._equipos.listEquipos().find(equip => equip.name === selectedEquipName);
    
    console.log(selectedEquip)

    if (selectedEquip) {
      const clienteId = this.cliente?.id;
      if (clienteId) {
        this.clientes.assignEquipo(clienteId, selectedEquip);
        this.loadDataEquipos(); 
        this.myControl.reset()
      }
    }
  }

  async loadData() {
    if (this.type === 'equipos') {
      // Cargar datos de equipos
      this.loadDataEquipos()

    } else if (this.type === 'usuarios') {
      // Cargar datos de usuarios
      await this.loadDataUsuario()

    }
  }

  async loadDataUsuario() {
 
    const response = await this.usuariosGlobales.getUsersByOrganizationId(this.organization.id!)
    this.organizationUsers = response.data
    this.dataSource = [ ... (this.organizationUsers || [])]

  }

  loadDataEquipos(){

    this.equiposClientes = this.cliente.equipos
    this.dataSource = [...(this.equiposClientes || [])]

  }

  async removeUsuario(clienteId:number, usuarioId: string){

    const response = await this.organizationService.unassignUserFromOrganization(usuarioId, clienteId);
    console.log(response)
    this.loadDataUsuario();
    
  }

  removeEquipo(clienteId:number, equipoId: number){
    
    this.clientes.removeEquipo(clienteId, equipoId);
    this.loadDataEquipos();

  }

}
