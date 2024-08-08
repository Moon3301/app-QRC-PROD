import { Component, OnInit, ViewChild, ChangeDetectionStrategy, signal } from '@angular/core';

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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
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
    MatInputModule, MatAutocompleteModule, MatTableModule, ReactiveFormsModule, IonicModule, 
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

  @ViewChild(IonModal) modalAddEquipo!: IonModal;

  readonly panelOpenState = signal(false);
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  dataFilter: dataFilter[] = []
  
  constructor(private formBuilder: FormBuilder, public clientes: ClientesService) {

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

  onWillDismissAddEquipo(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
      
    }
  }

  confirmAddMantencion() {
    this.modalAddEquipo.dismiss(null,'confirm');
  }

  cancelAddMantencion() {
    this.modalAddEquipo.dismiss(null, 'cancel');
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




}
