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

import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [MatAutocompleteModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, AsyncPipe, 
    MatTableModule, IonicModule]
})
export class UsuariosComponent  implements OnInit {

  @ViewChild(IonModal) modalRegister!: IonModal;

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

  displayedColumns: string[] = ['nombre', 'telefono'];
  dataSource = this.usuarios;

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

  openModalDetalleUsuario(){
    this.matDialog.open(DetalleUsuarioComponent, {
      width: '99%',
      height: '96%'
    })
  }

}
