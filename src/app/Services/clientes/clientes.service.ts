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
    this.clientes.push(cliente);

    this.api.createRequest('add-cliente', 'POST', {
      cliente: cliente
    })

  }

  addUsuario(clienteId: number, usuario:Usuario){
    
    for ( let item of this.clientes){

      if(clienteId === item.id){
        item.usuarios.push(usuario)

      }

    }

    this.api.createRequest('assing-user', 'POST', {
      clienteId: clienteId,
      usuario: usuario
    })

  }

  updateCliente(id: number, updatedCliente: Cliente) {
    const index = this.clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      this.clientes[index] = updatedCliente;
    }

    this.api.createRequest('update-client', 'POST', {
      idClient: id,
      client: updatedCliente
    })

  }

  deleteCliente(id: number) {
    this.clientes = this.clientes.filter(cliente => cliente.id !== id);

    this.api.createRequest('delete-client', 'POST',{
      id: id
    })
  }

  listClientes() {

    this.api.createRequest('list-clients', 'GET', {
      
    })

    return this.clientes;

    
  }

  findCliente(id: number) {
    return this.clientes.find(cliente => cliente.id === id);
  }

}
