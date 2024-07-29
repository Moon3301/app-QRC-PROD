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

import { IonicModule } from '@ionic/angular';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup,} from '@angular/forms';

import { Turno } from '../Interfaces/equipo';
import { Criticidad } from '../Interfaces/equipo';
import { Periodicidad } from '../Interfaces/equipo';

import { ClientesService } from '../Services/clientes/clientes.service';
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

@Component({
  standalone: true,
  selector: 'app-mantenciones',
  templateUrl: './mantenciones.component.html',
  styleUrls: ['./mantenciones.component.scss'],
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule, MatTableModule, ReactiveFormsModule, IonicModule, 
    MatExpansionModule, MatSelectModule]
})
export class MantencionesComponent  implements OnInit {

  turnos = Object.values(Turno)
  criticidad = Object.values(Criticidad)
  periodicidad = Object.values(Periodicidad)

  createForm!: FormGroup

  @ViewChild(IonModal) modalAddEquipo!: IonModal;

  readonly panelOpenState = signal(false);
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
 
  constructor(private formBuilder: FormBuilder, public clientes: ClientesService) {}

  ngOnInit() {

    this.createForm = this.formBuilder.group({

      turno: ['', Validators.required],
      criticidad: ['', Validators.required],
      cliente: ['', Validators.required],
      tipo_equipo: ['', Validators.required],
      periodicidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      activo: ['', Validators.required],
      archivo_fisico: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      serie: ['', Validators.required],
      acreditacion: ['', Validators.required],
      ultima_mantencion: ['', Validators.required],

    })
    
  }

  onWillDismissAddEquipo(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      
    }
  }

  confirmAddEquipo() {
    this.modalAddEquipo.dismiss(null,'confirm');
  }

  cancelAddEquipo() {
    this.modalAddEquipo.dismiss(null, 'cancel');
  }


}
