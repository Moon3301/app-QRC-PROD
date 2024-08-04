import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

import {MatStepperModule} from '@angular/material/stepper';

import { IonicModule } from '@ionic/angular';

import { IonModal } from '@ionic/angular';

import { OverlayEventDetail } from '@ionic/core/components';

import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule,
    MatSlideToggleModule, ReactiveFormsModule, MatStepperModule, IonicModule]
})
export class LoginComponent  implements OnInit {

  @ViewChild(IonModal) modalRegister!: IonModal;

  paletteToggle = false;

  isLinear = true;
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private router: Router, private matDialog:MatDialog) { }

  ngOnInit() {


  }

  openModalResetPass(){
    this.matDialog.open(ResetPasswordComponent, {
      width: '99%',
      height: '35%'
    })
  }

  confirmRegister() {
    this.modalRegister.dismiss(null,'confirm');
  }

  cancelRegister() {
    this.modalRegister.dismiss(null, 'cancel');
  }

  navigateToHome() {
    this.router.navigate(['/inicio']);
  }

 

  onWillDismissRegister(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      
    }
  }

}
