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

  addForm!: FormGroup

  constructor(private _formBuilder: FormBuilder, private matDialog:MatDialog, private usuarios: UsuariosService) {

    this.positions = this.usuarios.getPosition();
  }

  ngOnInit() {

    this.loadDataUsuarios()

    this.addForm = this._formBuilder.group({

      position: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
     
    })

  }

  
  async loadDataUsuarios(){
    /*
    this.dataSource = [...(this.usuarios.listUsuarios() || [])]
    */

    const response = await this.usuarios.getUsers();
    const usuarios = response.data

    this.dataSource = [... (usuarios || [])]
  }
  
  onWillDismissRegister(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      
    }
  }

  confirmRegister() {

    this.addForm.reset();

    this.loadDataUsuarios();

    this.modalRegister.dismiss(null,'confirm');
  }

  cancelRegister() {
    this.addForm.reset();
    this.modalRegister.dismiss(null, 'cancel');
  }

  openModalDetalleUsuario(element:any){

    console.log(element)
    
    this.matDialog.open(DetalleUsuarioComponent, {
      width: '99%',
      height: '96%'
    })
  }

  addUsuario(){

    try{

      let now = new Date()
      let timestamp = now.getTime()
      let uniximeStamp = Math.floor(timestamp / 1000);

      const position = this.addForm.get("position")?.value
      const nombre = this.addForm.get("nombre")?.value
      const username = this.addForm.get("username")?.value
      const password = this.addForm.get("password")?.value
      const email = this.addForm.get("email")?.value
      const telefono = this.addForm.get("telefono")?.value

      let user: User = {

        id: ''+uniximeStamp,
        name: nombre, 
        position: position, 
        signature: '', 
        organizacion_id: 0,
        username: username, 
        normalized_username: username,
        email: email, 
        normalized_email: email, 
        email_confirmed: false,
        password_hash: '', 
        security_stamp: '', 
        concurrency_stamp: '', 
        phone_number: telefono, 
        phone_number_confirmed: false,
        two_factor_enabled: false,
        password: password, 
        lockout_end: '', 
        lockout_enabled: false, 
        acces_failed_count: 0
      
      }

      this.usuarios.addUser(user)

      this.confirmRegister()

    }catch (error){

      console.log("Error al crear usuario")

    }
    

  }

}
