import { Component, OnInit, ViewChild, ChangeDetectionStrategy, signal, ViewChildren, QueryList } from '@angular/core';
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

import {MatDividerModule} from '@angular/material/divider';

export interface equiposTest {
  equipo: string;
  descripcion: string;
  serie: string;
  ult_mantencion: string;
  periodicidad: string;
}

const ELEMENT_DATA: equiposTest[] = [
  {equipo: 'FAN COIL', descripcion: 'BODEGA EQUIPOS NEONATOLOGIA', serie: '	K115031551', ult_mantencion: '4/ 4/ 2024', periodicidad: 'Cuatrimestral'},
  {equipo: 'SPLIT DUCTO', descripcion: 'URGENCIA TRAUMATOLOGICA, BOX 2', serie: 'K113100214', ult_mantencion: '17/ 4/ 2024', periodicidad: 'Cuatrimestral'},
  {equipo: 'FAN COIL', descripcion: 'NORTE, MEDICO JEFE PABELLONES', serie: '	K111030298', ult_mantencion: '20/ 5/ 2024', periodicidad: 'Trimestral'},
  {equipo: 'FAN COIL', descripcion: 'PLANTA TRATAMIENTO DE AGUA HEMODIALISIS', serie: '	THS-9681', ult_mantencion: '4/ 7/ 2024', periodicidad: 'Mensual'},
  {equipo: 'FAN COIL', descripcion: 'PERIFERICA PISO 6 MO', serie: '50531E19666910', ult_mantencion: '11/ 4/ 2024', periodicidad: 'Cuatrimestral'},
  {equipo: 'FAN COIL', descripcion: 'ENFERMERA COORDINADORA CLINICO DE TRANSPLANTE, PISO 13 TORRE SUR', serie: 'F5047005FA08565', ult_mantencion: '11/ 5/ 2024', periodicidad: 'Cuatrimestral'},
  {equipo: 'FAN COIL', descripcion: 'AREA DE MATERIALES QUIRURGICOS', serie: 'UJIM041966', ult_mantencion: '4/ 4/ 2024', periodicidad: 'Trimestral'},
  {equipo: 'FAN COIL', descripcion: 'AREA LIMPIA, PISO 9 TORRE NORTE', serie: 'F300408BI08834', ult_mantencion: '25/ 5/ 2024', periodicidad: 'Trimestral'},
  {equipo: 'FAN COIL', descripcion: 'AREA LIMPIA, PISO 7 TORRE NORTE', serie: 'K114012998', ult_mantencion: '11/ 5/ 2024', periodicidad: 'Trimestral'},
  {equipo: 'FAN COIL', descripcion: 'AREA LIMPIA MQ ALA NORTE, PISO 2 CLINICA', serie: 'K113065030', ult_mantencion: '11/ 5/ 2024', periodicidad: 'Cuatrimestral'},
  {equipo: 'FAN COIL', descripcion: 'NORTE, MEDICO JEFE PABELLONES', serie: 'UJIM041966', ult_mantencion: '22/ 5/ 2024', periodicidad: 'Mensual'},
];

@Component({
  standalone: true,
  selector: 'app-equipos',
  providers: [provideNativeDateAdapter()],
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule, MatTableModule, ReactiveFormsModule, IonicModule, MatDividerModule,
    MatExpansionModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class EquiposComponent  implements OnInit {

  turnos = Object.values(Turno)
  criticidad = Object.values(Criticidad)
  periodicidad = Object.values(Periodicidad)
  equiposCliente: Category[] = []

  createForm!: FormGroup
  filterForm!: FormGroup

  @ViewChild('modalAddEquipo', { static: false }) modalAddEquipo!: IonModal;

  //@ViewChild('modalEditEquipo', { static: false }) modalEditEquipo!: IonModal;
  //@ViewChild('modalViewMantenciones', { static: false }) modalViewMantenciones!: IonModal;

  
  //@ViewChildren(IonModal) modalEditEquipoTest!: QueryList<IonModal>;
  //@ViewChildren(IonModal) modalViewMantencionesTest!: QueryList<IonModal>;

  @ViewChildren('modalEditEquipo') modalEditEquipo!: QueryList<IonModal>;
  @ViewChildren('modalViewMantenciones') modalViewMantenciones!: QueryList<IonModal>;
   
  readonly panelOpenState = signal(false);
  
  dataSource = ELEMENT_DATA;

  dataFormSelect: any[] = []
  dataFormInput: any[] = []

  constructor(private formBuilder: FormBuilder, public clientes: ClientesService) {}

  ngOnInit() {

    this.dataFormSelect = [

      {name: 'Turno', type: 'turno', data: this.turnos},
      {name: 'Criticidad', type: 'criticidad', data: this.criticidad},
      {name: 'Cliente', type: 'cliente', data: []},
      {name: 'Tipo de Equipo', type: 'tipo_equipo', data: []},
      {name: 'Calendario', type: 'calendario', data: this.periodicidad},
      
    ]

    this.dataFormInput = [

      {name: 'Descripcion', type: 'descripcion', icon: 'description'},
      {name: 'Ubicacion', type: 'ubicacion', icon: 'pin_drop'},
      {name: 'Activo', type: 'activo', icon: ''},
      {name: 'Archivo Fisico', type: 'archivo_fisico', icon: ''},
      {name: 'Marca', type: 'marca', icon: ''},
      {name: 'Modelo', type: 'modelo', icon: ''},
      {name: 'Serie', type: 'serie', icon: ''},
  
    ]

    this.filterForm = this.formBuilder.group({

      turno: ['', ],
      criticidad: ['', ],
      cliente: ['', ],
      tipo_equipo: ['', ],
      calendario: ['', ],
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

    this.createForm = this.formBuilder.group({

      turno: ['', ],
      criticidad: ['', ],
      cliente: ['', Validators.required],
      tipo_equipo: ['', Validators.required,],
      calendario: ['', ],
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

  // Modal Add Mantencion
  onWillDismissAddEquipo(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
  }

  confirmAddEquipo() {
    this.createForm.reset();
    this.modalAddEquipo.dismiss(null,'confirm');
  }

  cancelAddEquipo() {
    this.createForm.reset();
    this.modalAddEquipo.dismiss(null, 'cancel');
  }

  // Modal Edit Mantencion
  onWillDismissEditEquipo(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
  }

  confirmEditEquipo() {

    this.modalEditEquipo.toArray().forEach(modal => modal.dismiss(null, 'confirm'));
  }

  cancelEditEquipo() {
    
    this.modalEditEquipo.toArray().forEach(modal => modal.dismiss(null, 'cancel'));
  }

  // Modal View Mantenciones
  onWillDismissViewMantenciones(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
  }

  confirmViewMantenciones() {
    
    this.modalViewMantenciones.toArray().forEach(modal => modal.dismiss(null, 'confirm'));
  }

  cancelViewMantenciones() {
    
    this.modalViewMantenciones.toArray().forEach(modal => modal.dismiss(null, 'cancel'));
  }

  //
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

  addMantenimiento(){}
  
}
