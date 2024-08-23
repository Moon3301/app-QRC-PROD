import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/Services/organization/organization.service';
import { SecurityService } from 'src/app/Services/Security/security.service';
@Component({
  standalone:true,
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  imports: []
})
export class InicioComponent  implements OnInit {

  constructor(private organizations: OrganizationService, private security:SecurityService ) {}

  async ngOnInit() {

    const response = await this.organizations.assignCategoryToOrganization(1,1);
    console.log(response)
  }

  

}
