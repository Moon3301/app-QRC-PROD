import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  standalone: true,
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatIconModule,
    MatInputModule, MatButtonModule, MatCardModule]
})
export class DetalleUsuarioComponent  implements OnInit {

  constructor(public matDialogRef: MatDialogRef<DetalleUsuarioComponent>) { }

  ngOnInit() {}

  closeModal(){
    this.matDialogRef.close();
  }

}
