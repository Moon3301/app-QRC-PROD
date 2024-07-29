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
      id:1 ,email:'test1@acdata.cl' ,nombre:'Pedro' , cargo: this.cargos[0], username: "pvaldez", password: "1234", telefono: "", roles: []
    },
    {
      id:2 ,email:'test2@acdata.cl' ,nombre:'Juan' , cargo: this.cargos[1], username: "jmedina", password: "1234", telefono: "", roles: []
    },
    {
      id:3 ,email:'test3@acdata.cl' ,nombre:'Diego' , cargo: this.cargos[2], username: "drodriguez", password: "1234", telefono: "", roles: []
    },
    {
      id:4 ,email:'test4@acdata.cl' ,nombre:'Felipe' , cargo: this.cargos[3], username: "fmesa", password: "1234", telefono: "", roles: []
    },

  ]

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

  updateUsuario(id: number, updatedUsuario: Usuario) {
    const index = this.usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
      this.usuarios[index] = updatedUsuario;
    }
  }

  deleteUsuario(id: number) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
  }

  findUsuario(id: number): Usuario | undefined {
    return this.usuarios.find(usuario => usuario.id === id);
  }

}
