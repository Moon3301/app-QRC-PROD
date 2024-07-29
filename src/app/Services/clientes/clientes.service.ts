import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Interfaces/cliente';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from 'src/app/Interfaces/usuario';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private usuarios: UsuariosService, private api:ApiService){}

  clientes: Cliente[] = [
    {id: 1, nombre: 'ACDATA', telefono_jefe_area: '+56 988943613', telefono_supervisor_area: '+56 913369488', usuarios: [] },
    {id: 2, nombre: 'MERCADO LIBRE', telefono_jefe_area: '+56 988943613', telefono_supervisor_area: '+56 913369488', usuarios: []},
    {id: 3, nombre: 'CLINICA LAS CONDES', telefono_jefe_area: '+56 988943613', telefono_supervisor_area: '+56 913369488', usuarios: []},
    {id: 4, nombre: 'CLINICA ALEMANA', telefono_jefe_area: '+56 988943613', telefono_supervisor_area: '+56 913369488', usuarios: []},
  ]

  addCliente(cliente: Cliente) {

    /*
    this.api.createRequest('add-cliente', 'POST', {
      cliente: cliente
    })
    */

    this.clientes.push(cliente);

  }

  assingUsuario(clienteId: number, usuario:Usuario){
    
    /*
    this.api.createRequest('assing-user', 'POST', {
      clienteId: clienteId,
      usuario: usuario
    })
    */

    const cliente = this.clientes.find(c => c.id === clienteId);

    const usuarioId = usuario.id;
    const existe = cliente?.usuarios.find(u => u.id === usuarioId);

    if (cliente) {

      if(existe){
        console.log("Usuario ya esta asignado")
      }else{
        cliente.usuarios.push(usuario);
      }

      
    }

  }

  removeUsuario(clienteId: number, usuarioId: number): void {
    const cliente = this.findCliente(clienteId);
    if (cliente) {
      cliente.usuarios = cliente.usuarios.filter(u => u.id !== usuarioId);
    }
  }

  updateCliente(id: number, updatedCliente: Cliente) {

    /*
    this.api.createRequest('update-client', 'POST', {
      idClient: id,
      client: updatedCliente
    })
    */

    const index = this.clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      this.clientes[index] = updatedCliente;
    }

    
  }

  deleteCliente(id: number) {
    
    /*
    this.api.createRequest('delete-client', 'POST',{
      id: id
    })
    */

    this.clientes = this.clientes.filter(cliente => cliente.id !== id);

  }

  listClientes() {

    /*
    this.api.createRequest('list-clients', 'GET', {
      
    })
    */
    
    return this.clientes;

  }

  findCliente(id: number) {
    return this.clientes.find(cliente => cliente.id === id);
  }

}
