import { Injectable } from '@angular/core';
import { Organization, Building, Tower } from 'src/app/Interfaces/organization';
import { ApiService } from '../api/api.service';
import { api_url } from '../utilities';
import { SecurityService } from '../Security/security.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  currentUser: any;

  constructor(private api:ApiService, private security: SecurityService) {

    this.currentUser = this.security.currentUserValue

  }

  getOrganizationByUserId() {

    // Procedimiento de almacenado OrganizationCollection
    // Si el parámetro userId es igual a '*', devuelve todas las organizaciones de la tabla Organization
    // Si el parámetro userId tiene valores, devuelve las organizaciones que tienen a ese usuario asignado

    // Obtiene los datos guardados en storage del usuario logeado.
    const user = this.security.currentUserValue;
    
    // Obtiene el ID del usuario logeado
    const userId = user.userId;
    const token = user.token;

    // Se define el endpoint al que se obtendra la data de Organizations asociado a este usuario.
    const endpoint = `${api_url}/organizations/${userId}`;
    const method = 'GET';
    const body = null;

    return this.api.createRequest(endpoint, method, body, token);
  }

  getAllOrganizations() {
    // Procedimiento de almacenado OrganizationCollection
    // Si el parámetro userId es igual a '*', devuelve todas las organizaciones de la tabla Organization
    // Si el parámetro userId tiene valores, devuelve las organizaciones que tienen a ese usuario asignado
    const userId = '*'

    const endpoint = `${api_url}/organizations/${userId}`;
    const method = 'GET';
    const body = null;

    return this.api.createRequest(endpoint, method, body);
  }

  addOrganization(descr: string, telefono_jefe_area: string, telefono_supervisor_area: string) {
    const endpoint = `${api_url}/organizations`;
    const method = 'POST';
    const body = {descr: descr, telefono_jefe_area: telefono_jefe_area, telefono_supervisor_area: telefono_supervisor_area};

    return this.api.createRequest(endpoint, method, body);
  }

  updateOrganization(organizationId: number, organization: Organization) {
    const endpoint = `${api_url}/organizations/${organizationId}`;
    const method = 'PUT';
    const body = {organization};

    return this.api.createRequest(endpoint, method, body);
  }

  deleteOrganization(organizationId: number) {
    const endpoint = `${api_url}/organizations/${organizationId}`;
    const method = 'DELETE';
    const body = null;

    return this.api.createRequest(endpoint, method, body);
  }

  findOrganization(organizationId: number) {

    const endpoint = `${api_url}/organizations/${organizationId}`;
    const method = 'GET';
    const body = null

    return this.api.createRequest(endpoint, method, body);
  }

  assignUserToOrganization(userId: string, organizationId: number) {

    // Procedimiento de almacenado OrganizationUserRelation
    // Si el parametro userId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el usuario con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el usuario con la organizacion

    const endpoint = `${api_url}/organizations/${organizationId}/users/assign`;
    const method = 'POST';
    const body = {userId: userId, remove: false};

    return this.api.createRequest(endpoint, method, body);
  }

  unassignUserFromOrganization(userId: string, organizationId: number) {

    // Procedimiento de almacenado OrganizationUserRelation
    // Si el parametro userId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el usuario con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el usuario con la organizacion

    const endpoint = `${api_url}/organizations/${organizationId}/users/unassign`;
    const method = 'POST';
    const body = {userId: userId, remove: true};

    return this.api.createRequest(endpoint, method, body);
  }

  assignCategoryToOrganization(organizationId: number, categoryId: number) {

    // Procedimiento de almacenado OrganizationCategoryRelation
    // Si el parametro categoryId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el equipo con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el equipo con la organizacion

    const endpoint = `${api_url}/organizations/${organizationId}/categories/assign`;
    const method = 'POST';
    const body = {categoryId: categoryId, remove: false};

    return this.api.createRequest(endpoint, method, body);
  }

  unassignCategoryFromOrganization(organizationId: number, categoryId: number) {

    // Procedimiento de almacenado OrganizationCategoryRelation
    // Si el parametro categoryId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el equipo con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el equipo con la organizacion

    const endpoint = `${api_url}/organizations/${organizationId}/categories/unassign`;
    const method = 'POST';
    const body = {categoryId: categoryId, remove: true};

    return this.api.createRequest(endpoint, method, body);
  }

  async getTower(){

    const endpoint = `${api_url}/get-tower`
    const method = 'GET'
    const body = null

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

  async getBuilding(){

    const endpoint = `${api_url}/get-building`
    const method = 'GET'
    const body = null

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

}
