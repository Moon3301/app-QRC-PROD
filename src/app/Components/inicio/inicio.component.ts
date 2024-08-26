import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/Services/organization/organization.service';
import { SecurityService } from 'src/app/Services/Security/security.service';
import { Category } from 'src/app/Interfaces/category-equip';
import { CategoryService } from 'src/app/Services/category/category.service';
@Component({
  standalone:true,
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  imports: []
})
export class InicioComponent  implements OnInit {

  constructor(private organizations: OrganizationService, private security:SecurityService, private categoryService: CategoryService ) {}

  async ngOnInit() {


    
  }

  

}
