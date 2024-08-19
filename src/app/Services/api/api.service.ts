import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = ''
  
  constructor() { }

  async createRequest(endpoint: string, _method: string, body:any, token?:string): Promise<any>{
    
    try{

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
  
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.apiUrl}/${endpoint}`, {

        method: _method,
        headers: headers,
        body: body ? JSON.stringify(body): undefined 
  
      });
  
      const status = response.status;
      const jsonResponse = await response.json();
  
      if(response.ok){
        return {
          data: jsonResponse, status
        }
      } else {
        return {
          error: jsonResponse.message || "Error al obtener datos de la solicitud", status
        }
      }

    }catch (error:any){

      return {
        error: error.message || 'Error al al realizar la solicitud',
        status: 0,
      }

    }
    
  }

  /* EJEMPLO DE USO

  GET
  async fetchData() {
    const response = await this.apiService.createRequest('some-endpoint', 'GET', null);

    if (response.data) {
      console.log('Data:', response.data);
    } else {
      console.error('Error:', response.error);
    }

    console.log('Status:', response.status);
  }

  POST
  async postData() {
    const body = { key: 'value' };
    const response = await this.apiService.createRequest('some-endpoint', 'POST', body);

    if (response.data) {
      console.log('Data:', response.data);
    } else {
      console.error('Error:', response.error);
    }

    console.log('Status:', response.status);
  }


  */

}
