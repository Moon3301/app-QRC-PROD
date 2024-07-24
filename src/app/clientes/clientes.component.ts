import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { IonRouterOutlet, IonList, IonItem, IonContent, IonModal, IonHeader, IonToolbar, IonButtons, IonButton } from "@ionic/angular/standalone";

import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { Cliente } from './cliente';
import { Usuario } from './usuario';
import { Cargo } from './cargo';

import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  standalone: true,
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  imports: [IonButtons, IonToolbar, IonHeader,IonContent ,IonModal , IonButton ,IonItem, MatButtonModule,
    MatIconModule, MatListModule, MatToolbarModule, RouterModule, MatFormFieldModule, MatInputModule, MatCardModule ]
})
export class ClientesComponent  implements OnInit {

  @ViewChildren(IonModal) modalClients!: QueryList<IonModal>;

  cargos: Cargo[] = [
    {id:1, nombre: 'Administrador'},
    {id:2, nombre: 'Supervisor'},
    {id:3, nombre: 'Tecnico'},
    {id:4, nombre: 'Ayudante'},
    {id:5, nombre: 'Cliente'},
  ]
  
  usuarios: Usuario[] = [
    {
      id:1 ,email:'test1@acdata.cl' ,nombre:'Test1' , cargo: this.cargos[0]
    },
    {
      id:2 ,email:'test2@acdata.cl' ,nombre:'Test2' , cargo: this.cargos[1]
    },
    {
      id:3 ,email:'test3@acdata.cl' ,nombre:'Test3' , cargo: this.cargos[2]
    },
    {
      id:4 ,email:'test4@acdata.cl' ,nombre:'Test4' , cargo: this.cargos[3]
    },

  ]

  clientes: Cliente[] = [
    {id: 1, nombre: 'ACDATA', telefono_jefe_area: '+56 988943613', telefono_supervisor_area: '+56 913369488', usuarios: this.usuarios },
    {id: 2, nombre: 'MERCADO LIBRE', telefono_jefe_area: '+56 988943613', telefono_supervisor_area: '+56 913369488', usuarios: this.usuarios},
    {id: 3, nombre: 'CLINICA LAS CONDES', telefono_jefe_area: '+56 988943613', telefono_supervisor_area: '+56 913369488', usuarios: this.usuarios},
    {id: 4, nombre: 'CLINICA ALEMANA', telefono_jefe_area: '+56 988943613', telefono_supervisor_area: '+56 913369488', usuarios: this.usuarios},
  ]

  constructor(private router: Router) { }
  


  ngOnInit(

    

  ) {}


  onWillDismissRegister(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      
    }
  }

  confirmRegister() {
    this.modalClients.toArray().forEach(modal => modal.dismiss(null, 'confirm'));
  }
  
  cancelRegister() {
    this.modalClients.toArray().forEach(modal => modal.dismiss(null, 'cancel'));
  }

  navigateToUsuarios() {
    this.closeModalsAndNavigate([`/config-cliente/usuarios`])
  }

  navigateToEquipos() {
    this.closeModalsAndNavigate([`/config-cliente/equipos`])
  }

  closeModalsAndNavigate(route: any[]) {
    Promise.all(this.modalClients.toArray().map(modal => modal.dismiss(null, 'confirm')))
      .then(() => {
        this.router.navigate(route);
      });
  }

}
