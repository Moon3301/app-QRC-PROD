import { Injectable } from '@angular/core';
import { Cargo } from 'src/app/Interfaces/cargo';
import { User } from 'src/app/Interfaces/usuario';
import { ApiService } from '../api/api.service';
import { api_url } from '../utilities';
import { SecurityService } from '../Security/security.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private api: ApiService, private security: SecurityService) { }

  cargos: Cargo[] = [
    {id:1, nombre: 'Administrador'},
    {id:2, nombre: 'Supervisor'},
    {id:3, nombre: 'Tecnico'},
    {id:4, nombre: 'Ayudante'},
    {id:5, nombre: 'Cliente'},
  ]
  
  usuarios: User[] = [
    {
      id: '1',
      name: 'John Doe',
      position: 1,
      signature: 'signature1',
      organizacion_id: 1,
      username: 'johndoe',
      normalized_username: 'JOHNDOE',
      email: 'john.doe@example.com',
      normalized_email: 'JOHN.DOE@EXAMPLE.COM',
      email_confirmed: true,
      password_hash: 'hash1',
      security_stamp: 'stamp1',
      concurrency_stamp: 'stamp1',
      phone_number: '1234567890',
      phone_number_confirmed: true,
      two_factor_enabled: false,
      password: 'password1',
      lockout_end: '',
      lockout_enabled: false,
      acces_failed_count: 0
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 2,
      signature: 'signature2',
      organizacion_id: 1,
      username: 'janesmith',
      normalized_username: 'JANESMITH',
      email: 'jane.smith@example.com',
      normalized_email: 'JANE.SMITH@EXAMPLE.COM',
      email_confirmed: true,
      password_hash: 'hash2',
      security_stamp: 'stamp2',
      concurrency_stamp: 'stamp2',
      phone_number: '0987654321',
      phone_number_confirmed: true,
      two_factor_enabled: true,
      password: 'password2',
      lockout_end: '',
      lockout_enabled: true,
      acces_failed_count: 1
    },
    
  ];

  async getUsers(): Promise<any>{

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/users`
    const method = 'GET'
    const body = undefined

    const response = await this.api.createRequest(endpoint, method, body, token)
    return response

  }

  async addUser(user: User): Promise<any>{

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/users`
    const method = 'POST'
    const body = {user: user}

    const response = await this.api.createRequest(endpoint, method, body, token)
    return response

  }

  async getUsersByOrganizationId(organizationId:number){

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const queryParams = { organization: `${organizationId}`}
    const endpoint = `${api_url}/users`
    const method = 'GET'
    const body = null

    const response = await this.api.createRequest(endpoint, method, body, token, queryParams)
    return response

  }

  async updateUser(user: string, updatedUser: User) {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const queryParams = {
      user: user,
      updatedUser: updatedUser
    }

    const endpoint = `${api_url}/users`
    const method = 'PUT'
    const body = {updatedUser: updatedUser}

    const response = await this.api.createRequest(endpoint, method, body, token, queryParams)
    return response

  }

  async updatePositionUser(userId:string, position: number){

    // Procedimiento de almacenado UserUpdatePosition
    // actualiza la posicion del usuario
    this.security.loadToken();
    const token = this.security.currentToken

    const endpoint = `${api_url}/users/${userId}/position`
    const method = 'PUT'
    const body = {position: position}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async updatePasswordUser(password:string, rep_password:string, user: number){

    this.security.loadToken();
    const token = this.security.currentToken

    const quryParams = {}
    const endpoint = `${api_url}/users/${user}/password`
    const method = 'PUT'
    const body = { password: password, rep_password: rep_password, user: user}

    const response =  await this.api.createRequest(endpoint, method, body);
    return response

  }

  async deleteUser(userId: string) {

    this.security.loadToken();
    const token = this.security.currentToken

    const endpoint = `${api_url}/users/${userId}`
    const method = 'DELETE'
    const body = null;

    const response = await this.api.createRequest(endpoint, method, body)
    return response

    //this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
  }

  

  async getUserByPosition(position: number = 0) {

    this.security.loadToken();
    const token = this.security.currentToken

    // Procedimiento de almacenado UserRead
    // Si username es vacio y organization es 0, devuelve todos los usuarios
    // Si username es vacio y organization tiene valores, devuelve todos los usuarios asociados al ID de la organization
    // Si username tiene valores, devuelve todos los usuarios con el username definido y los nombres de los roles asociados al username definido

    const endpoint = `${api_url}/users/${position}`
    const method = 'GET'
    const body = null

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async getUserByUsername(username: string = '*'){

    this.security.loadToken();
    const token = this.security.currentToken

    const endpoint = `${api_url}/users/${username}`
    const method = 'GET'
    const body = null

    const response = await this.api.createRequest(endpoint, method, body)
    return response
  }

  getPosition(): Cargo[] {
    
    return this.cargos
  }

  findUser(id: string) {
    return this.usuarios.find(usuario => usuario.id === id);
  }

}
