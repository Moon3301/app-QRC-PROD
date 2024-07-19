import { Component, OnInit, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';

import { IonicModule } from '@ionic/angular';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators,} from '@angular/forms';

import { OverlayEventDetail } from '@ionic/core/components';

import { IonModal } from '@ionic/angular';

import { MatDialog } from '@angular/material/dialog';


@Component({
  standalone: true,
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule, MatTableModule, AsyncPipe, ReactiveFormsModule, IonicModule]
})
export class EquiposComponent  implements OnInit {

  @ViewChild(IonModal) modalRegister!: IonModal;
  
  equipos: any[] = [
    {
      nombre:"PURIFICADOR",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"UNIDAD MANEJADORA DE AIRE",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"VENTILADOR INYECTOR DE AIRE",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"FAN COIL",
      telefono: "999999999",
      telefono_Av: "9999999999"
    }
  ]

  displayedColumns: string[] = ['nombre', 'telefono'];
  dataSource = this.equipos;

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  constructor(private _formBuilder: FormBuilder, private matDialog:MatDialog) {}

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onWillDismissRegister(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      
    }
  }

  confirmRegister() {
    this.modalRegister.dismiss(null,'confirm');
  }

  cancelRegister() {
    this.modalRegister.dismiss(null, 'cancel');
  }

}
