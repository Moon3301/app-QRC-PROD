import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

export type ordenTrabajo = {

  descripcion: string;
  ubicacion: string;
  tecnicoAsignado: string;
  fechaProgramada: string;
  serie: string;
  orden: string;
  estado: string;
  data: {name: string, check: boolean}[];

}

const OT: ordenTrabajo[] = [

  {
    descripcion: 'BODEGA EQUIPOS NEONATOLOGIA',
    ubicacion:'PISO 5 MO', tecnicoAsignado: 'Yenry Perez', 
    fechaProgramada: '4/9/2024', 
    serie: 'K115031551', 
    orden: '17835', 
    estado: 'Asignada',
    data: [
      {name: 'Limpieza de filtros', check: false},
      {name: 'Limpieza rejilla(s) de extracción', check: false},
      {name: 'Chequeo y limpieza de termostato', check: false},
      {name: 'Limpieza de difusores (Rejilla de retorno si aplica)', check: false},
      {name: 'Limpieza de sistema de condensado y desagüe (incluye mantención a bomba de condensado)', check: false},
      {name: 'Reapriete de borneras de motores', check: true},
      {name: 'Chequeo de válvulas', check: false},
      {name: 'Revisión auditiva de rodamientos y vibraciones', check: false},
      {name: 'Limpieza general del equipo', check: true},
    
    ]
    
  },
  {
    descripcion: 'BODEGA EQUIPOS NEONATOLOGIA',
    ubicacion:'PISO 5 MO', tecnicoAsignado: 'Yenry Perez', 
    fechaProgramada: '4/9/2024', 
    serie: 'K115031551', 
    orden: '17835', 
    estado: 'Asignada',
    data: [
      {name: 'Limpieza de filtros', check: false},
      {name: 'Limpieza rejilla(s) de extracción', check: false},
      {name: 'Chequeo y limpieza de termostato', check: false},
      {name: 'Limpieza de difusores (Rejilla de retorno si aplica)', check: false},
      {name: 'Limpieza de sistema de condensado y desagüe (incluye mantención a bomba de condensado)', check: false},
      {name: 'Reapriete de borneras de motores', check: true},
      {name: 'Chequeo de válvulas', check: false},
      {name: 'Revisión auditiva de rodamientos y vibraciones', check: false},
      {name: 'Limpieza general del equipo', check: true},
    
    ]
  },
  {
    descripcion: 'BODEGA EQUIPOS NEONATOLOGIA',
    ubicacion:'PISO 5 MO', tecnicoAsignado: 'Yenry Perez', 
    fechaProgramada: '4/9/2024', 
    serie: 'K115031551', 
    orden: '17835', 
    estado: 'Asignada',
    data: [
      {name: 'Limpieza de filtros', check: false},
      {name: 'Limpieza rejilla(s) de extracción', check: false},
      {name: 'Chequeo y limpieza de termostato', check: false},
      {name: 'Limpieza de difusores (Rejilla de retorno si aplica)', check: false},
      {name: 'Limpieza de sistema de condensado y desagüe (incluye mantención a bomba de condensado)', check: false},
      {name: 'Reapriete de borneras de motores', check: true},
      {name: 'Chequeo de válvulas', check: false},
      {name: 'Revisión auditiva de rodamientos y vibraciones', check: false},
      {name: 'Limpieza general del equipo', check: true},
    
    ]
  },
  {
    descripcion: 'BODEGA EQUIPOS NEONATOLOGIA',
    ubicacion:'PISO 5 MO', tecnicoAsignado: 'Yenry Perez', 
    fechaProgramada: '4/9/2024', 
    serie: 'K115031551', 
    orden: '17835', 
    estado: 'Asignada',
    data: [
      {name: 'Limpieza de filtros', check: false},
      {name: 'Limpieza rejilla(s) de extracción', check: false},
      {name: 'Chequeo y limpieza de termostato', check: false},
      {name: 'Limpieza de difusores (Rejilla de retorno si aplica)', check: false},
      {name: 'Limpieza de sistema de condensado y desagüe (incluye mantención a bomba de condensado)', check: false},
      {name: 'Reapriete de borneras de motores', check: true},
      {name: 'Chequeo de válvulas', check: false},
      {name: 'Revisión auditiva de rodamientos y vibraciones', check: false},
      {name: 'Limpieza general del equipo', check: true},
    
    ]
  },

]

@Component({
  standalone: true,
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss'],
  imports: [MatCardModule, MatCheckboxModule, CommonModule, FormsModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatButtonModule
  ]
})
export class OrdenTrabajoComponent  implements OnInit {

  constructor() { }

  ordenTrabajo = OT[0]

  ngOnInit() {

    console.log(this.ordenTrabajo)

  }

}
