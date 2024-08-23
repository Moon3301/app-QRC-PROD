import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup,} from '@angular/forms';

import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { User } from 'src/app/Interfaces/usuario';

@Component({
  standalone: true,
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatIconModule,
    MatInputModule, MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule, ]
})
export class DetalleUsuarioComponent  implements OnInit {

  userDetailForm!: FormGroup
  changepasswordForm!: FormGroup

  constructor(private _formBuilder: FormBuilder, public matDialogRef: MatDialogRef<DetalleUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public usuarioService:UsuariosService) { }

  ngOnInit() {
    console.log('Data dialog detalle-usuario: ',this.data); // Aquí puedes ver los datos recibidos

    this.userDetailForm = this._formBuilder.group({

      email: [this.data.email || ''],
      name: [this.data.name || ''],
      position: [this.data.position || ''],
      
    })

    this.changepasswordForm = this._formBuilder.group({

      password: ['']

    })

  }

  updateDetailUser(){

    const user:User = {

      id: this.data.id,
      name:this.data.name,
      position:this.data.position,
      signature: 'string',
      organizacion_id: 0,
      username: this.data.userName,
      normalized_username:this.data.userName,
      email:this.data.userName,
      normalized_email:this.data.userName,
      email_confirmed: true,
      password_hash: 'string',
      security_stamp: 'string',
      concurrency_stamp:'string',
      phone_number: 'string',
      phone_number_confirmed:false,
      two_factor_enabled: false,
      password: 'string',
      lockout_end: 'string',
      lockout_enabled: false,
      acces_failed_count: 0

    }

    const response = this.usuarioService.updateUser(this.data.id, this.data);
    console.log(response)


  }

  closeModal(){
    this.matDialogRef.close();
  }



}
