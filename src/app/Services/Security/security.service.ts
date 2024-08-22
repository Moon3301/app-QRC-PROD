import { Injectable, inject } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { User } from 'src/app/Interfaces/usuario';
import { UserToken } from 'src/app/Interfaces/usuario';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ApiService } from '../api/api.service';

import { api_url } from '../utilities';

import { Store, select } from '@ngrx/store';

import { selectToken } from 'src/app/Store/Authentication/auth.selectors';
import { AuthState } from 'src/app/Store/Authentication/auth.reducer';
import { setToken, clearToken } from 'src/app/Store/Authentication/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {

  currentToken:string | null = null;
  token$!: Observable<string | null>;

  constructor(private api:ApiService, private store: Store<{ auth: AuthState }>) {
    //this.token$ = this.store.select(selectToken);
}

  setUserToken(token:string) {       
    
    this.store.dispatch(setToken({ token }));
  }

  clearUserToken() {
    this.store.dispatch(clearToken());
  } 

  /*
  public async loadCurrentUser() {

    try {
      const userToken = await this.loadStoredUserToken();
      if (!userToken || !userToken.user) {
        throw new Error('Token no encontrado en el almacenamiento.');
      }
      return userToken.user;
    } catch (error:any) {
      console.error('Error al obtener el token:', error.message);
      throw new Error('Error al obtener el token.'); // Lanzar un error si no se puede obtener el token
    }
  }
  */
  /*
  public _loadToken(): Observable<string | null> {
    return this.store.pipe(select(selectToken));
  }
  */
 
  public async loadToken(){
    // Selecciona el token desde el store
    this.token$ = this.store.select(selectToken);
    this.token$.subscribe(token => {
      if (token) {
        this.currentToken = token
      } else {
        console.log('No hay token disponible.');
      }
    });
  }

  async login(username: string, password: string){

    const endpoint = `${api_url}/security/login`
    const method = 'POST'

    const queryParams = {
      "username": username,
      "password": password
    }
    const body = undefined
    const token = undefined

    const response = await this.api.createRequest(endpoint, method, body, token, queryParams);

    if(response){

      const user: User = { 
        id: response.data.id,
        name: response.data.name,
        position: response.data.position,
        signature: '',
        organizacion_id: 0,
        username: response.data.userName,
        normalized_username:  ''+response.data.userName.toUpperCase(),
        email: response.data.email,
        normalized_email: ''+response.data.email.toUpperCase(),
        email_confirmed: true,
        password_hash: '',
        security_stamp: '',
        concurrency_stamp: '',
        phone_number: '',
        phone_number_confirmed: true,
        two_factor_enabled: false,
        password: '',
        lockout_end: '',
        lockout_enabled: false,
        acces_failed_count: 0
      }

      const userToken: UserToken = {
        user: user,
        login_provider: 'mobile',
        name: 'token',
        value: response.data.token
      }
      console.log('Guardando token en store')
      //await this.storage.set('UserToken', userToken)
      this.setUserToken(userToken.value)
      
    }else{

      console.log('Error al iniciar sesion.')

    }

  }
  
  logout(){
    
    //this.storage.remove('currentUser');
    
  }

}

