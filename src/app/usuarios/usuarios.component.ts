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

import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators,} from '@angular/forms';

import { OverlayEventDetail } from '@ionic/core/components';

import { IonModal } from '@ionic/angular';

import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [MatAutocompleteModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, 
    MatTableModule, IonicModule]
})
export class UsuariosComponent  implements OnInit {

  @ViewChild(IonModal) modalRegister!: IonModal;

  usuarios: any[] = [
    {
      nombre:"Pedro",
      correo: "user1@gmail.com",
      cargo: "Tecnico"
    },
    {
      nombre:"Diego",
      correo: "user2@gmail.com",
      cargo: "Suspervisor"
    },
    {
      nombre:"Juan",
      correo: "user3@gmail.com",
      cargo: "Ayudante"
    },
    {
      nombre:"Carlos",
      correo: "user4@gmail.com",
      cargo: "Administrador"
    }
  ]

  displayedColumns: string[] = ['nombre', 'correo', 'cargo'];
  dataSource = this.usuarios;

  constructor(private _formBuilder: FormBuilder, private matDialog:MatDialog) {}

  ngOnInit() {

  
  }



  onWillDismissRegister(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      
    }
  }

  confirmRegister() {
    this.modalRegister.dismiss(null,'confirm');
  }

  cancelRegister() {
    this.modalRegister.dismiss(null, 'cancel');
  }

  openModalDetalleUsuario(element:any){

    console.log(element)
    
    
    this.matDialog.open(DetalleUsuarioComponent, {
      width: '99%',
      height: '96%'
    })
  }

}
