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
import { Position, User } from 'src/app/Interfaces/usuario';

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

    
  
    this.userDetailForm = this._formBuilder.group({

      username: [this.data.username || ''],
      email: [this.data.email || ''],
      name: [this.data.name || ''],
      position: [this.data.position || ''],
      phone_number: [this.data.phone_number || '']
      
    })

    const positions = this.usuarioService.getPosition();
    const positionUser = this.userDetailForm.get("position")?.value;
    const formatPosition = positions.find( x => x.id === positionUser)

    this.userDetailForm.patchValue({
      position: formatPosition?.name
    })


    this.changepasswordForm = this._formBuilder.group({

      password: ['']

    })

  }

  updateDetailUser(){

    const updatedUser:User = {

      id: this.data.id,
      name:this.data.name,
      position:this.data.position,
      username: this.data.userName,
      email:this.data.userName,
      phone_number: this.data.telefono,
      
    }

    const response = this.usuarioService.updateUser(updatedUser);
    console.log(response)

  }

  closeModal(){
    this.matDialogRef.close();
  }

}
