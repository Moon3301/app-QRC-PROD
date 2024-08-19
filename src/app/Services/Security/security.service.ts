import { Injectable } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from 'src/app/Interfaces/usuario';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageService } from '../Storage/storage.service';

import { ApiService } from '../api/api.service';

import { api_url } from '../utilities';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private user: UsuariosService, private api:ApiService, private storage: StorageService) {

    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.loadStoredUser();

  }

  private async loadStoredUser() {

    const user = this.storage.get('currentUser');

    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  async login(username: string, password: string){

    const endpoint = `${api_url}/security/login`
    const method = 'POST'
    const body = {username: username, password: password}

    const response = await this.api.createRequest(endpoint, method, body);

    if(response && response.token){

      this.storage.set('currentUser', response);
      this.currentUserSubject.next(response);

    }else{

      console.log('Error al iniciar sesion.')

    }

  }

  logout(){

    

    this.storage.remove('currentUser');
    this.currentUserSubject.next(null);

  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

}
