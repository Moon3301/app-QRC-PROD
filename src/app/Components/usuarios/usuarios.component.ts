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

import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup,} from '@angular/forms';

import { OverlayEventDetail } from '@ionic/core/components';

import { IonModal } from '@ionic/angular';

import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

import { MatDialog } from '@angular/material/dialog';

import { UsuariosService } from '../../Services/usuarios/usuarios.service';
import { User } from '../../Interfaces/usuario';

import {MatSelectModule} from '@angular/material/select';
@Component({
  standalone: true,
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [MatAutocompleteModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, 
    MatTableModule, IonicModule, MatSelectModule]
})
export class UsuariosComponent  implements OnInit {

  @ViewChild(IonModal) modalRegister!: IonModal;

  displayedColumns: string[] = ['nombre', 'correo', 'cargo'];
  dataSource: User[] = []
  positions : any

  createUserForm!: FormGroup

  constructor(private _formBuilder: FormBuilder, private matDialog:MatDialog, private usuarios: UsuariosService) {

    this.positions = this.usuarios.getPosition();
  }

  ngOnInit() {

    this.loadDataUsuarios()

    this.createUserForm = this._formBuilder.group({

      position: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      phone_number: ['', Validators.required]

    })

    

  }

  formatPosition(positionId:number){

    const positions = this.usuarios.getPosition();
    const formatPosition = positions.find( x => x.id === positionId)

    if(formatPosition){
      return formatPosition.name
    }else{
      return 'Sin registro'
    }

  }

  async loadDataUsuarios(){

    const response = await this.usuarios.getUsers();
    const usuarios = response.data
    this.dataSource = [... (usuarios || [])]
  }
  
  onWillDismissRegister(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {}
  }

  confirmRegister() {
    this.createUserForm.reset();
    this.loadDataUsuarios();
    this.modalRegister.dismiss(null,'confirm');
  }

  cancelRegister() {
    this.createUserForm.reset();
    this.modalRegister.dismiss(null, 'cancel');
  }

  openModalDetalleUsuario(element:any){

    this.matDialog.open(DetalleUsuarioComponent, {
      width: '99%',
      data: element
    })
  }

  addUsuario(){

    try{

      const position = this.createUserForm.get("position")?.value
      const name = this.createUserForm.get("name")?.value
      const username = this.createUserForm.get("username")?.value
      const email = this.createUserForm.get("email")?.value
      const phone_number = this.createUserForm.get("phone_number")?.value

      const user: User = {

        name: name, 
        position: position, 
        username: username, 
        email: email, 
        phone_number: phone_number,
      
      }

      console.log('user: ',user)

      this.usuarios.addUser(user)

      this.confirmRegister()

    }catch (error){

      console.log("Error al crear usuario")

    }
    
  }

}
