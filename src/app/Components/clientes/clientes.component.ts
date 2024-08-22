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

import { ClientesService } from '../../Services/clientes/clientes.service';
import { Cliente } from '../../Interfaces/cliente';

import { OrganizationService } from 'src/app/Services/organization/organization.service';
import { SecurityService } from 'src/app/Services/Security/security.service';

import { Organization } from 'src/app/Interfaces/organization';
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
  updateFormOrganzation!: FormGroup
  organizations: any[] = []

  constructor(private router: Router, public clientes: ClientesService, public _FormBuilder: FormBuilder,
    public serviceOrganization: OrganizationService) {}
  
  async ngOnInit() {

    this.organizations = await this.getOrganizations();
    console.log(this.organizations)

    this.addFormCliente = this._FormBuilder.group({

      descr: ['', Validators.required],
      managerPhone: ['', Validators.required],
      supervisorPhone: ['', Validators.required],

    })

    this.updateFormOrganzation = this._FormBuilder.group({

      descr: [''],
      managerPhone: [''],
      supervisorPhone: ['']

    })

  }

  public async getOrganizations(): Promise<Organization[]>{

    const organization: Organization[] = await this.serviceOrganization.getOrganizations() || [];
    return organization
  }

  public async updateOrganizations(organizacionId: number){

    try{
      
      const descr = this.updateFormOrganzation.get("descr")?.value;
      const managerPhone = this.updateFormOrganzation.get("managerPhone")?.value;
      const supervisorPhone = this.updateFormOrganzation.get("supervisorPhone")?.value;

      const organization: Organization = {Id: organizacionId, Descr: descr, ManagerPhone: managerPhone, SupervisorPhone: supervisorPhone}

      console.log(organization)

      const response = await this.serviceOrganization.updateOrganization(organization)
      console.log(response)

      

    }catch(error){

      console.log(error)
    }
    
  }

  // DETAIL

  onWillDismissDetail(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    
    if (ev.detail.role === 'confirm') {

    }

    
  }

  updateDetailForm(organization: any){
    
    this.updateFormOrganzation.patchValue({
      descr: organization.descr,
      managerPhone: organization.managerPhone,
      supervisorPhone: organization.supervisorPhone

    })
  }

  confirmDetail(organizacion: any) {
    
    this.modalClients.toArray().forEach(modal => modal.dismiss(null, 'confirm'));

  }
  
  cancelDetail() {
    
    this.modalClients.toArray().forEach(modal => modal.dismiss(null, 'cancel'));
  }
  

  // REGISTER

  onWillDismissRegister(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      this.addFormCliente.reset();

    }
  }

  confirmRegister() {
    this.addFormCliente.reset();
    this.modalRegister.dismiss(null,'confirm');
  }
  
  cancelRegister() {
    this.addFormCliente.reset();
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

  async addOrganization(){

    try{

      const Descr = this.addFormCliente.get("nombre")?.value || ''
      const ManagerPhone = this.addFormCliente.get("telefono_jefe_area")?.value || ''
      const SupervisorPhone = this.addFormCliente.get("telefono_supervisor_area")?.value || ''

      const organizacion: Organization = {Id: 0, Descr: Descr, ManagerPhone: ManagerPhone, SupervisorPhone: SupervisorPhone}
      this.serviceOrganization.addOrganization(organizacion)

      this.confirmRegister();

    }catch(error){

      console.log('Error al crear la organizacion. Error: '+error)
    }
    
  }

}
