import { Injectable } from '@angular/core';
import { Cargo } from 'src/app/Interfaces/cargo';
import { Usuario } from 'src/app/Interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

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
    // Añade otros tres usuarios de manera similar
  ];

  addUsuario(usuario: Usuario) {
    
    this.usuarios.push(usuario);

    console.log('Usuario creado con exito!')
    console.log(this.usuarios)
  }

  listUsuarios(): Usuario[] {
    return this.usuarios;
  }

  getCargos(): Cargo[] {
    
    return this.cargos
  }

  updateUsuario(id: string, updatedUsuario: Usuario) {
    const index = this.usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
      this.usuarios[index] = updatedUsuario;
    }
  }

  deleteUsuario(id: string) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
  }

  findUsuario(id: string): Usuario | undefined {
    return this.usuarios.find(usuario => usuario.id === id);
  }

}
