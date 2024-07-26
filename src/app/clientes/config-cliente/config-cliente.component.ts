import { Component, OnInit, ViewChild } from '@angular/core';

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
import { Usuario } from 'src/app/Interfaces/usuario';

import { ClientesService } from 'src/app/Services/clientes/clientes.service';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';


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

  equipos: any[] = [
    {
      nombre:"ACDATA1",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA2",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA3",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA4",
      telefono: "999999999",
      telefono_Av: "9999999999"
    }
  ]

  displayedColumns: string[] = ['nombre', 'telefono'];
  
  dataSource:any

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  type: string = ''

  usuariosClientes!: Usuario[] | undefined
  cliente!: Cliente | undefined
  

  constructor(private route: ActivatedRoute, private clientes:ClientesService, private usuariosGlobales:UsuariosService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let clienteId = params.get('cliente')!;
      
      this.cliente = this.clientes.findCliente(parseInt(clienteId))

      this.route.paramMap.subscribe(params => {
        this.type = params.get('type')!;
        this.loadData();
      });

    });

   

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let usernameUsuario = this.usuariosGlobales.usuarios.map( user => user.username)
    
    if(usernameUsuario){
      return usernameUsuario.filter(option => option.toLowerCase().includes(filterValue));
    }

    return []
  }

  onOptionSelected(event: any) {
    const selectedUsername = event.option.value;
    const selectedUser = this.usuariosGlobales.usuarios.find(user => user.username === selectedUsername);
    if (selectedUser) {

      let clienteId = this.cliente?.id
      if(clienteId){
        this.clientes.addUsuario(clienteId, selectedUser)
        console.log("Cliente agregado")
        this.loadDataCliente()
        console.log("Recargando lista")
      }

    }
  }

  loadData() {
    if (this.type === 'equipos') {
      // Cargar datos de equipos
      this.dataSource = this.equipos;

    } else if (this.type === 'usuarios') {
      // Cargar datos de usuarios

      this.loadDataCliente()


      
    }
  }

  loadDataCliente(){
    this.usuariosClientes = this.cliente?.usuarios
    this.dataSource = this.usuariosClientes
  }

}
