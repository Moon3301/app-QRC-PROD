import { Injectable } from '@angular/core';
import { Organization, Building, Tower } from 'src/app/Interfaces/organization';
import { ApiService } from '../api/api.service';
import { api_url } from '../utilities';
import { SecurityService } from '../Security/security.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private api:ApiService, private security: SecurityService) {}

  async getOrganizations(): Promise<any>{

    const user = this.security.currentUserValue;
    const token = user.result;

    const endpoint = `${api_url}/organizations`;
    const method = 'GET'
    const body = undefined
    
    return await this.api.createRequest(endpoint, method, body, token);

  }

  getOrganizationByUserId() {

    // Obtiene los datos guardados en storage del usuario logeado.
    const user = this.security.currentUserValue;
    
    // Obtiene el ID del usuario logeado
    const userId = user.userId;
    const token = user.result;

    // Se define el endpoint al que se obtendra la data de Organizations asociado a este usuario.
    const endpoint = `${api_url}/organizations/${userId}`;
    const method = 'GET';
    const body = undefined;

    return this.api.createRequest(endpoint, method, body, token);
  }

  addOrganization(organization: Organization) {

    const user = this.security.currentUserValue;
    const token = user.token;

    const endpoint = `${api_url}/organizations`;
    const method = 'POST';
    const body = {organization};

    return this.api.createRequest(endpoint, method, body, token);
  }

  updateOrganization(organization: Organization) {
    
    const user = this.security.currentUserValue;
    const token = user.token;

    const organizationId = organization.id

    const endpoint = `${api_url}/organizations/${organizationId}`;
    const method = 'PUT';
    const body = {organization};

    return this.api.createRequest(endpoint, method, body, token);
  }

  deleteOrganization(organizationId: number) {

    const user = this.security.currentUserValue;
    const token = user.token;

    const endpoint = `${api_url}/organizations/${organizationId}`;
    const method = 'DELETE';
    const body = null;

    return this.api.createRequest(endpoint, method, body, token);
  }

  findOrganization(organizationId: number) {

    const user = this.security.currentUserValue;
    const token = user.token;

    const endpoint = `${api_url}/organizations/${organizationId}`;
    const method = 'GET';
    const body = null

    return this.api.createRequest(endpoint, method, body, token);
  }

  assignUserToOrganization(userId: string, organizationId: number) {
    // Procedimiento de almacenado OrganizationUserRelation
    // Si el parametro userId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el usuario con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el usuario con la organizacion

    const user = this.security.currentUserValue;
    const token = user.token;

    const endpoint = `${api_url}/organizations/${organizationId}/users/assign`;
    const method = 'POST';
    const body = {userId: userId, remove: false};

    return this.api.createRequest(endpoint, method, body, token);
  }

  unassignUserFromOrganization(userId: string, organizationId: number) {
    // Procedimiento de almacenado OrganizationUserRelation
    // Si el parametro userId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el usuario con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el usuario con la organizacion

    const user = this.security.currentUserValue;
    const token = user.token;

    const endpoint = `${api_url}/organizations/${organizationId}/users/unassign`;
    const method = 'POST';
    const body = {userId: userId, remove: true};

    return this.api.createRequest(endpoint, method, body, token);
  }

  assignCategoryToOrganization(organizationId: number, categoryId: number) {
    // Procedimiento de almacenado OrganizationCategoryRelation
    // Si el parametro categoryId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el equipo con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el equipo con la organizacion

    const user = this.security.currentUserValue;
    const token = user.token;

    const endpoint = `${api_url}/organizations/${organizationId}/categories/assign`;
    const method = 'POST';
    const body = {categoryId: categoryId, remove: false};

    return this.api.createRequest(endpoint, method, body, token);
  }

  unassignCategoryFromOrganization(organizationId: number, categoryId: number) {
    // Procedimiento de almacenado OrganizationCategoryRelation
    // Si el parametro categoryId es vacio no hace ni devuelve nada
    // Si el parametro remove es 0 asigna el equipo con la organizacion
    // Si el parametro remove es diferente de 0 desasigna el equipo con la organizacion

    const user = this.security.currentUserValue;
    const token = user.token;

    const endpoint = `${api_url}/organizations/${organizationId}/categories/unassign`;
    const method = 'POST';
    const body = {categoryId: categoryId, remove: true};

    return this.api.createRequest(endpoint, method, body, token);
  }

  async getTower(){

    const endpoint = `${api_url}/tower`
    const method = 'GET'
    const body = null

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

  async getBuilding(){

    const endpoint = `${api_url}/building`
    const method = 'GET'
    const body = null

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

}
