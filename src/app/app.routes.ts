import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ScannerQRComponent } from './scanner-qr/scanner-qr.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EquiposComponent } from './equipos/equipos.component';

export const routes: Routes = [

  {
    path:'login',
    component: LoginComponent,
  },
  {
      path: '',
      redirectTo:'login',
      pathMatch: 'full'
  },
  {
    path: '',
    component: MenuComponent,
    children: [

      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'scannerQR',
        component: ScannerQRComponent
      },
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'equipos',
        component: EquiposComponent,
      }
      
    ]
  }

  
];
