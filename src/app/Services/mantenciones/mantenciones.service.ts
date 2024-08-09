import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

import { api_url } from '../utilities';
@Injectable({
  providedIn: 'root'
})
export class MantencionesService {

  constructor(private api: ApiService) { }

  async createMaintenance(id:number = 0, organizationId:number = 0, calendar: number = 0, priority: number = 0,
  shift:number = 0, categoryId:number = 0, asset:string = '', descr: string = '', location: string,
  physicalFile:string = '', serial: '', brand: '', model: '', accreditation: boolean, supervisorId: string = '',
  technicianId: string = '', helperId: string = '', month: number = 0, programmed: string = ''){

    // Crea un nuevo mantenimiento

    const endpoint = `${api_url}/create-maintenance`
    const method = 'POST'
    const body = {id:id, organizationId: organizationId, calendar: calendar, priority: priority, shift: shift, categoryId: categoryId,
    asset: asset, descr: descr, location: location, physicalFile: physicalFile, serial: serial, brand: brand, model: model,
    accreditation: accreditation, supervisorId: supervisorId, technicianId: technicianId, helperId: helperId, month: month, programmed: programmed}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async deleteMaintenance(id:number = 0, organizationId:number = 0, calendar: number = 0, priority: number = 0, shift:number = 0,
  categoryId:number = 0, asset:string = '', descr: string = '', location: string, physicalFile:string = '', 
  serial: '', brand: '', model: '', accreditation: boolean, month: number = 0, maintenanceId: number = 0, status: number = 0){

    // Elimina un mantenimiento

    const endpoint = `${api_url}/delete-maintenance`
    const method = 'POST'
    const body = {id:id, organizationId: organizationId, calendar: calendar, priority: priority, shift: shift, categoryId: categoryId,
    asset: asset, descr: descr, location: location, physicalFile: physicalFile, serial: serial, brand: brand, model: model,
    accreditation: accreditation, month: month, maintenanceId: maintenanceId, status: status}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async filterMaintenance(id: number = 0, organizationId: number = 0, categoryId: number = 0, physicalFile:string = '',
  status: number = 0, month: number = 0, year: number = 0, pageIndex: number = 1, pageSize: number = 10){
    
    // Procedimiento de almacenado MaintenanceFilter
    // Busca y filtra los registros de los mantenimientos basandose en los parametros indicados devolviendolos
    // en un formato de paginado

    const endpoint = `${api_url}/filter-maintenance`
    const method = 'POST'
    const body = {id:id, organizationId: organizationId, categoryId: categoryId, physicalFile: physicalFile, 
    status: status, month: month, year: year, pageIndex: pageIndex, pageSize: pageSize}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async filterPrintMaintenance(id: number = 0, equipmentId: number = 0, organizationId:number = 0, categoryId: number = 0,
  physicalFile: string = '', status: number, month: number, year: number){

    // Procedimiento de almacenado MaintenanceFilterPrint
    // 

    const endpoint = `${api_url}/filter-print-maintenance`
    const method = 'POST'
    const body = {id:id, equipmentId: equipmentId, organizationId: organizationId, categoryId: categoryId, physicalFile: physicalFile, 
    status: status, month: month, year: year}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async getMaintenanceByQr(qr: number){

    // Procedimiento de almacenado MaintenanceIdByQr
    // Obtiene un mantenimiento asociado al parametro indicado 'qr' 

    const endpoint = `${api_url}/get-maintenance-qr`
    const method = 'POST'
    const body = {qr:qr}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async updateMaintenanceImage(id: number, image:string){

    const endpoint = `${api_url}/update-maintenance-image`
    const method = 'POST'
    const body = {id:id, image: image}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async updateMaintenanceLabor(id: number, manintenanceId: number, finished: boolean){

    // Procedimiento de almacenado MaintenanceLaborUpdate

    const endpoint = `${api_url}/update-maintenance-labor`
    const method = 'POST'
    const body = {id:id, manintenanceId: manintenanceId, finished: finished}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async updateMaintenanceMeasurement(id: number, value: number){

    const endpoint = `${api_url}/update-maintenance-measurement`
    const method = 'POST'
    const body = {id:id, value: value}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async updateMaintenanceObservation(id:number, observation: string){

    const endpoint = `${api_url}/update-maintenance-observation`
    const method = 'POST'
    const body = {id:id, observation: observation}

    const response = await this.api.createRequest(endpoint, method, body)
    return response
    
  }

  async getFullMaintenance(maintenanceId: number){

    const endpoint = `${api_url}/get-full-maintenance`
    const method = 'POST'
    const body = {maintenanceId:maintenanceId}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async updateMaintenanceStatus(id:number, status: number){

    const endpoint = `${api_url}/update-maintenance-status`
    const method = 'POST'
    const body = {id:id, status:status}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async getMaintenanceWork(id:number){

    const endpoint = `${api_url}/get-maintenance-work`
    const method = 'POST'
    const body = {id:id}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async getMeasurement(){

    const endpoint = `${api_url}/get-measurement`
    const method = 'GET'
    const body = {}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }
  
  async getMonthHistoryMaintenance(month: number, year: number){

    const endpoint = `${api_url}/month-history-maintenance`
    const method = 'POST'
    const body = {month: month, year: year}

    const response = await this.api.createRequest(endpoint, method, body)
    return response


  }

  async VisiblePdfUpdate(id: number, visible: boolean){

    const endpoint = `${api_url}/visible-pdf-update`
    const method = 'POST'
    const body = {id:id, visible:visible}

    const response = await this.api.createRequest(endpoint, method, body)
    return response

  }

  async ChangeMaintenanceCalendar(equipmentId:number, calendar:number){

    const endpoint = `${api_url}/change-maintenance-calendar`
    const method = 'POST'
    const body = {equipmentId:equipmentId, calendar:calendar}

    const response = await this.api.createRequest(endpoint, method, body)
    return response
    
  }

  






}
