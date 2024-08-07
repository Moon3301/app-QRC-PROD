import { Injectable } from '@angular/core';
import { Organization, Building, Tower } from 'src/app/Interfaces/organization';
import { ApiService } from '../api/api.service';
import { api_url } from '../utilities';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private api:ApiService) { }

  getOrganization(userId: any){

    // Procedimiento de almacenado OrganizationCollection
    // Si el parametro userId es igual a '*', devuelve todas las organizaciones de la tabla Organization
    // Si el parametro userId tiene valores, devuelve las organizaciones que tienen a ese usuario asignado

    const endpoint = `${api_url}/organizations`
    const method = 'POST'
    const body = {userid: userId}

    const response = this.api.createRequest(endpoint, method, body)

    return response
  }

  addOrganization(organization: Organization){

    const endpoint = ''
    const method = 'POST'
    const body = {organization: organization}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  updateOrganization(organizationId:number, organization: Organization){

    const endpoint = ''
    const method = 'POST'
    const body = {organizationId: organizationId, organization: organization}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  deleteOrganization(organizationId:number){

    const endpoint = ''
    const method = 'POST'
    const body = {organizationId: organizationId}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  findOrganization(organizationId:number){

    const endpoint = ''
    const method = 'POST'
    const body = {organizationId: organizationId}

    const response = this.api.createRequest(endpoint, method, body)

    return response
  }

  assingUserOrganization(userId:string, organizationId:number, remove: boolean = false){

    // Procedimiento de almacenado OrganizationUserRelation
    // Si el parametro userId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el usuario con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el usuario con la organizacion

    const endpoint = `${api_url}/assign-usuario`
    const method = 'POST'
    const body = {organizationId: organizationId, userId: userId, remove: remove}

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

  unassignUserOrganization(userId:string, organizationId:number, remove: boolean = true){

    // Procedimiento de almacenado OrganizationUserRelation
    // Si el parametro userId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el usuario con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el usuario con la organizacion

    const endpoint = `${api_url}/unassign-usuario`
    const method = 'POST'
    const body = {userId: userId, organizationId: organizationId, remove: remove}

    const response = this.api.createRequest(endpoint, method, body)
    return response
  }

  assignCategoryOrganization(organizationId:number, categoryId: number = 0, remove: boolean = false){

    // Procedimiento de almacenado OrganizationCategoryRelation
    // Si el parametro categoryId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el equipo con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el equipo con la organizacion

    const endpoint = `${api_url}/assign-category`
    const method = 'POST'
    const body = {organization: organizationId, category: categoryId ,remove: remove}

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

  unassignCategoryOrganization(organizationId:number, categoryId: number = 0, remove: boolean = true){

    // Procedimiento de almacenado OrganizationCategoryRelation
    // Si el parametro categoryId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el equipo con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el equipo con la organizacion
    
    const endpoint = `${api_url}/unassign-category`
    const method = 'POST'
    const body = {organization: organizationId, category: categoryId ,remove: remove}

    const response = this.api.createRequest(endpoint, method, body)
    return response
    
  }

  async getTower(){

    const endpoint = `${api_url}/get-tower`
    const method = 'GET'
    const body = {}

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

  async getBuilding(){

    const endpoint = `${api_url}/get-building`
    const method = 'GET'
    const body = {}

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

}
