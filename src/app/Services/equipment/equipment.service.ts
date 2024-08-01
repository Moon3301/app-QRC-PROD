import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Equipment, EquipmentItem, EquipmentCalendar, EquipmentFilter } from 'src/app/Interfaces/equipment';

import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private api:ApiService) { }

  async getEquipment() {

    const endpoint = ''
    const method = 'GET'
    const body = ''

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async getEquipmentById(id:number){

    const endpoint = ''
    const method = 'POST'
    const body = ''

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async createEquipment(equipment:Equipment){

    const endpoint = ''
    const method = 'POST'
    const body = ''

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async updateEquipment(id:number, equipment:Equipment){

    const endpoint = ''
    const method = 'POST'
    const body = ''

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async deleteEquipment(){

    const endpoint = ''
    const method = 'POST'
    const body = ''

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async filterEquipment(filter:EquipmentFilter){

    const endpoint = ''
    const method = 'POST'
    const body = ''

    const response = await this.api.createRequest(endpoint, method, body)
    return response
    
  }

}
