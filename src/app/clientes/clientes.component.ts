import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup,} from '@angular/forms';

import { IonRouterOutlet, IonList, IonItem, IonContent, IonModal, IonHeader, IonToolbar, IonButtons, IonButton } from "@ionic/angular/standalone";

import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { OverlayEventDetail } from '@ionic/core/components';

import { ClientesService } from '../Services/clientes/clientes.service';
import { Cliente } from '../Interfaces/cliente';
import { Usuario } from '../Interfaces/usuario';
@Component({
  standalone: true,
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  imports: [IonButtons, IonToolbar, IonHeader,IonContent ,IonModal , IonButton ,IonItem, MatButtonModule,
    MatIconModule, MatListModule, MatToolbarModule, RouterModule, MatFormFieldModule, MatInputModule, 
    MatCardModule, FormsModule, ReactiveFormsModule,  ]
})
export class ClientesComponent  implements OnInit {

  @ViewChildren(IonModal) modalClients!: QueryList<IonModal>;
  @ViewChild('modalRegister', { static: false }) modalRegister!: IonModal;

  addFormCliente!: FormGroup

  constructor(private router: Router, public clientes: ClientesService, public _FormBuilder: FormBuilder) { }
  
  ngOnInit() {

    this.addFormCliente = this._FormBuilder.group({

      nombre: ['', Validators.required],
      telefono_jefe_area: ['', Validators.required],
      telefono_supervisor_area: ['', Validators.required],

    })


  }

  onWillDismissDetail(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      
    }
  }

  confirmDetail() {
    this.modalClients.toArray().forEach(modal => modal.dismiss(null, 'confirm'));
  }
  
  cancelDetail() {
    this.modalClients.toArray().forEach(modal => modal.dismiss(null, 'cancel'));
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

  navigateToUsuarios(clienteId: number) {
    this.closeModalsAndNavigate([`/config-cliente/${clienteId}/usuarios`])
  }

  navigateToEquipos(clienteId: number) {
    this.closeModalsAndNavigate([`/config-cliente/${clienteId}/equipos`])
  }

  closeModalsAndNavigate(route: any[]) {
    Promise.all(this.modalClients.toArray().map(modal => modal.dismiss(null, 'confirm')))
      .then(() => {
        this.router.navigate(route);
      });
  }

  addCliente(){

    try{

      let now = new Date()
      let timestamp = now.getTime()
      let uniximeStamp = Math.floor(timestamp / 1000);

      const nombre = this.addFormCliente.get("nombre")?.value
      const telefono_jefe_area = this.addFormCliente.get("telefono_jefe_area")?.value
      const telefono_supervisor_area = this.addFormCliente.get("telefono_supervisor_area")?.value

      let cliente: Cliente = {id: uniximeStamp,nombre: nombre, telefono_jefe_area: telefono_jefe_area, telefono_supervisor_area: telefono_jefe_area, usuarios: []}

      console.log(cliente)

      this.clientes.addCliente(cliente)

      console.log(this.clientes.listClientes())

      this.confirmRegister()

    }catch (error){

      console.log("No se pudo crear cliente")

    }

  }

}
