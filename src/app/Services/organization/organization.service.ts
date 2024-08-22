import { Injectable } from '@angular/core';
import { Organization, Building, Tower } from 'src/app/Interfaces/organization';
import { ApiService } from '../api/api.service';
import { api_url } from '../utilities';
import { SecurityService } from '../Security/security.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/Store/Authentication/auth.reducer';
import { User } from 'src/app/Interfaces/usuario';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  
  constructor(private api:ApiService, private security: SecurityService, private store: Store<{ auth: AuthState }>) {}

  async getOrganizations(): Promise<any>{

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/organizations`;
    const method = 'GET'
    const body = undefined
    
    const response = await this.api.createRequest(endpoint, method, body, token);
    const organizacion = response.data

    return organizacion

  }

  /*
  async getOrganizationByUserId() {

    // Obtiene los datos guardados en storage del usuario logeado.
    const user = await this.security.currentUserValue();
    
    // Obtiene el ID del usuario logeado
    const userId = user.id;
    const token = user.token;

    // Se define el endpoint al que se obtendra la data de Organizations asociado a este usuario.
    const endpoint = `${api_url}/organizations/${userId}`;
    const method = 'GET';
    const body = undefined;

    return this.api.createRequest(endpoint, method, body, token);
  }
  */
  async addOrganization(organization: Organization): Promise<any> {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/organizations`;
    const method = 'POST';
    const body = {organization};

    const response = await this.api.createRequest(endpoint, method, body, token);
    return response
  }

  async updateOrganization(organization: Organization) {
    
    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/organizations`;
    const method = 'PUT';
    const body = {organization};

    return this.api.createRequest(endpoint, method, body, token);
  }

  async deleteOrganization(organizationId: number) {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/organizations/${organizationId}`;
    const method = 'DELETE';
    const body = null;

    return this.api.createRequest(endpoint, method, body, token);
  }

  async findOrganization(organizationId: number) {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const queryParams = { organizationId: `${organizationId}`}
    const endpoint = `${api_url}/organizations`;
    const method = 'GET';
    const body = null

    return this.api.createRequest(endpoint, method, body, token, queryParams);
  }

  async assignUserToOrganization(user: string, organization: number) {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const queryParams = {
      organization: `${organization}`,
      user: `${user}`
    }

    const endpoint = `${api_url}/organizations/user/assign`;
    const method = 'POST';
    const body = undefined;

    return this.api.createRequest(endpoint, method, body, token, queryParams);
  }

  async unassignUserFromOrganization(user: string, organization: number) {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const queryParams = {
      organization: `${organization}`,
      user: `${user}`
    }

    const endpoint = `${api_url}/organizations/user/unassign`;
    const method = 'POST';
    const body = undefined;

    return this.api.createRequest(endpoint, method, body, token, queryParams);
  }

  /*
  async assignUserToOrganizationV1(userId: string, organizationId: number) {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/organizations/${organizationId}/users/assign`;
    const method = 'POST';
    const body = {userId: userId};

    return this.api.createRequest(endpoint, method, body, token);
  }

  async unassignUserFromOrganizationV1(userId: string, organizationId: number) {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/organizations/${organizationId}/users/unassign`;
    const method = 'POST';
    const body = {userId: userId};

    return this.api.createRequest(endpoint, method, body, token);
  }
  */

  async assignCategoryToOrganization(organization: number, category: number) {
  
    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/organizations/category/assign/${organization}/${category}`;

    const method = 'POST';
    const body = undefined;

    return this.api.createRequest(endpoint, method, body, token);
  }

  async unassignCategoryFromOrganization(organization: number, category: number) {
    
    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/organizations/category/unassign/${organization}/${category}`;
    
    const method = 'POST';
    const body = undefined;

    return this.api.createRequest(endpoint, method, body, token);
  }

  /*
  async async getTower() {

    const endpoint = `${api_url}/tower`
    const method = 'GET'
    const body = undefined

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }

  async async getBuilding() {

    const endpoint = `${api_url}/building`
    const method = 'GET'
    const body = undefined

    const response = this.api.createRequest(endpoint, method, body)
    return response

  }
    */

}
