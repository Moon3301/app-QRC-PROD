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

import { OverlayEventDetail } from '@ionic/core/components';

import { ClientesService } from '../Services/clientes/clientes.service';
@Component({
  standalone: true,
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  imports: [IonButtons, IonToolbar, IonHeader,IonContent ,IonModal , IonButton ,IonItem, MatButtonModule,
    MatIconModule, MatListModule, MatToolbarModule, RouterModule, MatFormFieldModule, MatInputModule, 
    MatCardModule ]
})
export class ClientesComponent  implements OnInit {

  @ViewChildren(IonModal) modalClients!: QueryList<IonModal>;


  constructor(private router: Router, public clientes: ClientesService) { }
  


  ngOnInit() {


  }


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

}
