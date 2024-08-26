import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Equipment, EquipmentItem, EquipmentCalendar, EquipmentFilter } from 'src/app/Interfaces/equipment';

import { ApiService } from '../api/api.service';

import { api_url } from '../utilities';
import { SecurityService } from '../Security/security.service';

@Injectable({ 
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private api:ApiService, private security: SecurityService) { }

  async getEquipments() {

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/equipment`
    const method = 'GET'
    const body = undefined

    const response = await this.api.createRequest(endpoint, method, body, token)
    return response

  }

  async getEquipmentByOrganizationId(organizationId:number){

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const queryParams = { organizationId: `${organizationId}`}
    const endpoint = `${api_url}/equipment`
    const method = 'GET'
    const body = undefined

    const response = await this.api.createRequest(endpoint, method, body, token, queryParams)
    return response

  }

  async createEquipment(equipment:Equipment){

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const endpoint = `${api_url}/equipment`
    const method = 'POST'
    const body = {equipment: equipment}

    const response = await this.api.createRequest(endpoint, method, body, token)
    return response

  }

  async updateEquipment(id:number, equipment:Equipment){

    const endpoint = `${api_url}/equipment`
    const method = 'PUT'
    const body = {equipment: equipment}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  // DELETE
  // Procedimiento de almacenado realiza un UPDATE sobre la tabla equipmentFilterTable

  async deleteEquipment(equipmentId:number){

    this.security.loadToken();
    const token = this.security.currentToken

    if (!token) {
      console.error('Token no encontrado o inválido.'); 
      return null;
    }

    const queryParams = {equipmentId: `${equipmentId}`}
    const endpoint = `${api_url}/equipment`
    const method = 'DELETE'
    const body = undefined

    const response = await this.api.createRequest(endpoint, method, body, token, queryParams)
    return response

  }

  async filterEquipment(id:number = 0, organizationId:number = 0, calendar:number = 0, priority:number = 0, shift:number = 0,
    categoryId:number = 0, asset:string = '', descr: string = '', location: string = '', physicalFile:string = '', serial:string = '',
    brand:string = '', model:string = '', accreditation:boolean = false, month:boolean = false, pageIndex: number = 1, pageSize: number = 10){

    const endpoint = `${api_url}/equipment/filter`
    const method = 'POST'

    const body = {id:id, organizationId:organizationId, calendar: calendar, priority: priority, shift: shift, 
    categoryId: categoryId, asset: asset, descr: descr, location: location, physicalFile: physicalFile, serial: serial,
    brand: brand, model: model, accreditation: accreditation, pageIndex: pageIndex, pageSize: pageSize, month: month}

    const response = await this.api.createRequest(endpoint, method, body)
    return response
    
  }

  // GET
  async historyEquipment(id: number = 0, pageIndex:number = 1, pageSize = 10){

    // Obtiene el historial de mantenimientos de equipos de manera paginada. Devuelve info detallada de cada mantenimiento.

    const endpoint = `${api_url}/history-equipment`
    const method = 'POST'
    const body = {id:id, pageIndex: pageIndex, pageSize:pageSize}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  // UPDATE, GET
  async labelEquipment(equipmentId: number){

    // Realiza una actualizacion y una consulta a la tabla Equipment
    // Actualiza la columna QR de Equipment con el valor EquipmentId. Solo se actuliza cuando QR es 0 o NULL
    // Devuelve los registros del equipo y descripcion de las tablas Category y Organization. Filtra los resultados por el ID.
    // Se asegura que solo devuelva 1 solo registro.

    const endpoint = `${api_url}/label-equipment`
    const method = 'POST'
    const body = {equipmentId: equipmentId}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  // GET
  async getEquipmentPart(equipmentId: number, categoryId:number){

    // Procedimiento de almacenado EquipmentPartCollection
    // Obtiene los registros de la tabla EquipmentPart

    const endpoint = `${api_url}/get-equipment-part`
    const method = 'POST'
    const body = {equipmentId: equipmentId, categoryId: categoryId}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  // UPDATE, INSERT
  async updateEquipmentPart(equipmentId: number, partId: number, nominalValue: number){

    // Procedimiento de almacenado EquipmentPartUpdate
    // Actualiza e inserta los registros indicados en la tabla EquipmentPart
    // Si existe conincidencia con los valores equipmentId y PartId se actualiza el registro.
    // Si no existe coincidencia con los paramtros equipmentId y PartId se insertara un nuevo registro con los datos indicados.
    
    const endpoint = `${api_url}/update-equipment-part`
    const method = 'POST'
    const body = {equipmentId: equipmentId, partId: partId, nominalValue: nominalValue}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async ReadEquipmentByQR(qr: number){

    // Procedimiento de almacenado EquipmentReadByQR
    // Obtiene el equipo asociado al parametro 'QR'.

    const endpoint = `${api_url}/read-equipment-qr`
    const method = 'POST'
    const body = {qr:qr}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async ReadLastEquipmentByQR(qr: number){

    // Procedimiento de almacenado EquipmentReadLastByQR
    // Obtiene el ULTIMO equipo asociado al parametro 'QR'.

    const endpoint = `${api_url}/read-last-equipment-qr`
    const method = 'POST'
    const body = {qr:qr}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async getPhysicalFile(search:string = '*'){

    const endpoint = `${api_url}/get-physicalfile-equipment`
    const method = 'POST'
    const body = {search:search}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

}
