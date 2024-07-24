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

import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-config-cliente',
  templateUrl: './config-cliente.component.html',
  styleUrls: ['./config-cliente.component.scss'],
  imports: [MatAutocompleteModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, AsyncPipe, 
    MatTableModule, IonicModule]
})
export class ConfigClienteComponent  implements OnInit {

  usuarios: any[] = [
    {
      nombre:"ACDATA1",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA2",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA3",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA4",
      telefono: "999999999",
      telefono_Av: "9999999999"
    }
  ]

  equipos: any[] = [
    {
      nombre:"ACDATA1",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA2",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA3",
      telefono: "999999999",
      telefono_Av: "9999999999"
    },
    {
      nombre:"ACDATA4",
      telefono: "999999999",
      telefono_Av: "9999999999"
    }
  ]

  displayedColumns: string[] = ['nombre', 'telefono'];
  
  dataSource:any

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  type: string = ''

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.type = params.get('type')!;
      this.loadData();
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  loadData() {
    if (this.type === 'equipos') {
      // Cargar datos de equipos
      this.dataSource = this.equipos;

    } else if (this.type === 'usuarios') {
      // Cargar datos de usuarios
      this.dataSource = this.usuarios;
    }
  }

}
