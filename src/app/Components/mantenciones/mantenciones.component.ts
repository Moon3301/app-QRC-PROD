import { Component, OnInit, ViewChild, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { IonicModule } from '@ionic/angular';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup,} from '@angular/forms';

import { Turno } from '../../Interfaces/mantencion';
import { Criticidad } from '../../Interfaces/mantencion';
import { Periodicidad } from '../../Interfaces/mantencion';

import { ClientesService } from '../../Services/clientes/clientes.service';

import { Category } from '../../Interfaces/category-equip';
import { Cliente } from '../../Interfaces/cliente';

import {MatDatepickerModule} from '@angular/material/datepicker';

import {provideNativeDateAdapter} from '@angular/material/core';

import { months } from 'src/app/Services/utilities';
import { years } from 'src/app/Services/utilities';

import { Router } from '@angular/router';

export interface MantenimientosTest {

  equipo: string;
  serie: string;
  tecnico: string;
  programada: string;
  estado: string;

}

const ELEMENT_DATA: MantenimientosTest[] = [

  {equipo: 'FAN COIL', serie: 'K115031551', tecnico: 'Yenry Perez', programada: '4 /8 /2024', estado: 'Asignada'},
  {equipo: 'SPLIT DUCTO', serie: 'THS-9681', tecnico: 'Yenry Perez', programada: '4 /8 /2024', estado: 'Asignada'},
  {equipo: 'FAN COIL', serie: 'F5047005FA08565', tecnico: 'Yenry Perez', programada: '4 /8 /2024', estado: 'Asignada'},
  {equipo: 'FAN COIL', serie: 'F300408BI08834', tecnico: 'Yenry Perez', programada: '9 /8 /2024', estado: 'Asignada'},
  {equipo: 'SPLIT DUCTO', serie: 'K114012998', tecnico: 'Yenry Perez', programada: '12 /8 /2024', estado: 'Asignada'},
  {equipo: 'FAN COIL', serie: '50531E19666910', tecnico: 'Yenry Perez', programada: '7 /8 /2024', estado: 'Asignada'},
  {equipo: 'FAN COIL', serie: '	K113100214', tecnico: 'Yenry Perez', programada: '4 /8 /2024', estado: 'Asignada'},
  {equipo: 'FAN COIL', serie: '	K111030298', tecnico: 'Yenry Perez', programada: '4 /8 /2024', estado: 'Asignada'},
  {equipo: 'FAN COIL', serie: '	K113065030', tecnico: 'Yenry Perez', programada: '5 /8 /2024', estado: 'Asignada'},
  {equipo: 'FAN COIL', serie: '	UJIM041966', tecnico: 'Yenry Perez', programada: '1 /8 /2024', estado: 'Asignada'},

];

interface dataFilter {

  name: string;
  type: string;
  data: any[];
}

@Component({
  standalone: true,
  providers: [provideNativeDateAdapter()],
  selector: 'app-mantenciones',
  templateUrl: './mantenciones.component.html',
  styleUrls: ['./mantenciones.component.scss'],
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule, MatTableModule, ReactiveFormsModule, IonicModule, CommonModule,
    MatExpansionModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule],
    
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MantencionesComponent  implements OnInit {

  turnos = Object.values(Turno)
  criticidad = Object.values(Criticidad)
  periodicidad = Object.values(Periodicidad)
  equiposCliente: Category[] = []

  createForm!: FormGroup
  filterForm!: FormGroup

  @ViewChild('modalEditMantencion', { static: false }) modalEditMantencion!: IonModal;

  readonly panelOpenState = signal(false);

  dataSource = ELEMENT_DATA;

  dataFilter: dataFilter[] = []
  
  constructor(private formBuilder: FormBuilder, public clientes: ClientesService, public router: Router) {

  }

  ngOnInit() {

    this.dataFilter = [
      {name: 'Cliente',type: 'cliente', data: [] },
      {name: 'Tipo de equipo',type: 'tipo_equipo', data: [] },
      {name: 'Mes',type: 'month', data: months },
      {name: 'Año',type: 'year', data: years }
    ]

    this.filterForm = this.formBuilder.group({

      cliente: ['', ],
      tipo_equipo: ['', ],
      month: ['', ],
      year: ['', ]

    })

    this.createForm = this.formBuilder.group({

      turno: ['', ],
      criticidad: ['', ],
      cliente: ['', Validators.required],
      tipo_equipo: ['', Validators.required,],
      periodicidad: ['', ],
      descripcion: ['', ],
      ubicacion: ['', ],
      activo: ['', ],
      archivo_fisico: ['', ],
      marca: ['', ],
      modelo: ['', ],
      serie: ['', ],
      acreditacion: ['', ],
      ultima_mantencion: ['', ],

    })
    
  }

  onWillDismissEditMantencion(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
      
    }
  }

  confirmEditMantencion() {
    this.modalEditMantencion.dismiss(null,'confirm');
  }

  cancelEditMantencion() {
    this.modalEditMantencion.dismiss(null, 'cancel');
  }

  onClienteChange(clientId: number) {
    
    let cliente = this.clientes.listClientes().find( x=> x.id === clientId)
    if(cliente){
      this.equiposCliente = this.findEquiposCliente(cliente)
    }else{
      console.log('Cliente no encontrado')
    }
    
    // Aquí puedes agregar cualquier lógica adicional que necesites
  }

  findEquiposCliente(client: Cliente){

    let equipos = client.equipos
    return equipos

  }

  addMantenimiento(){

    


  }

  navigateToOrdenTrabajo(){
    this.router.navigate(['/orden-trabajo'])
  }


}
