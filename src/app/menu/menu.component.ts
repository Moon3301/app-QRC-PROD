import { Component, OnInit, ViewChild  } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { IonRouterOutlet, IonList } from "@ionic/angular/standalone";
import { MatDrawer } from '@angular/material/sidenav';

export interface Section {
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonList, IonRouterOutlet, MatSidenavModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule]
})
export class MenuComponent  implements OnInit {

  @ViewChild('drawer') drawer!: MatDrawer;

  folders: Section[] = [
    {
      name: 'Inicio',
      icon: 'pie_chart',
      route: '/inicio'
    },
    {
      name: 'Scanner QR',
      icon: 'qr_code_scanner',
      route: '/scannerQR'
    },
    {
      name: 'Mantenciones',
      icon: 'calendar_month',
      route: ''
    },
    {
      name: 'Equipos',
      icon: 'business_center',
      route: ''
    },
    {
      name: 'Documentos',
      icon: 'print',
      route: ''
    },
    {
      name: 'Configuracion de clientes',
      icon: 'manage_accounts',
      route: '/clientes'
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.drawer.close();
    });
  }

  navigateToComponent(navigate_url:string){

    this.router.navigate([navigate_url])

  }

}
