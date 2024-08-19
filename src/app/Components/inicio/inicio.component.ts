import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/Services/organization/organization.service';

@Component({
  standalone:true,
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  imports: []
})
export class InicioComponent  implements OnInit {

  private listOrganizations: any[] = []

  constructor(private organizations: OrganizationService) { }

  ngOnInit() {}

  async getOrganizations(){

   this.organizations.getOrganizations();

  }

}
