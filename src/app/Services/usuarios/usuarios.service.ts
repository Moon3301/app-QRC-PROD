import { Injectable } from '@angular/core';
import { Cargo } from 'src/app/Interfaces/cargo';
import { Usuario } from 'src/app/Interfaces/usuario';
import { ApiService } from '../api/api.service';
import { api_url } from '../utilities';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private api: ApiService) { }

  cargos: Cargo[] = [
    {id:1, nombre: 'Administrador'},
    {id:2, nombre: 'Supervisor'},
    {id:3, nombre: 'Tecnico'},
    {id:4, nombre: 'Ayudante'},
    {id:5, nombre: 'Cliente'},
  ]
  
  usuarios: Usuario[] = [
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

  async addUsuario(usuario: Usuario) {

    const endpoint = `${api_url}/users`
    const method = 'POST'
    const body = {user: usuario}

    const response = await this.api.createRequest(endpoint, method, body)
    return response
    //this.usuarios.push(usuario);

  }

  async getUserByPosition(position: number = 0) {

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

    const endpoint = `${api_url}/users/${username}`
    const method = 'GET'
    const body = null

    const response = await this.api.createRequest(endpoint, method, body)
    return response
  }

  async getUsersByOrganizationId(organizacionId:number){

    const endpoint = `${api_url}/users/${organizacionId}`
    const method = 'GET'
    const body = null

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  getPosition(): Cargo[] {
    
    return this.cargos
  }

  async updateUser(userId: string, updatedUser: Usuario) {

    const endpoint = `${api_url}/users/${userId}`
    const method = 'PUT'
    const body = {updatedUser: updatedUser}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

    /*
    const index = this.usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
      this.usuarios[index] = updatedUsuario;
    }
    */

  }

  async deleteUser(userId: string) {

    const endpoint = `${api_url}/users/${userId}`
    const method = 'DELETE'
    const body = null;

    const response = await this.api.createRequest(endpoint, method, body)
    return response

    //this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
  }

  findUser(id: string) {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  async updatePositionUser(userId:string, position: number){

    // Procedimiento de almacenado UserUpdatePosition
    // actualiza la posicion del usuario

    const endpoint = `${api_url}/users/${userId}/position`
    const method = 'PUT'
    const body = {position: position}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

}
