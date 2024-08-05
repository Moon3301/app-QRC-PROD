import { Injectable } from '@angular/core';
import { api_url } from '../utilities';

import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService) { }

  async getCategory(descr: string){

    // Procedimiento de almacenado CategoryAutocomplete
    // Si el parametro @search es igual a '*' (Por defecto), devolvera todos los registros de la tabla category
    // Si el parametro @search tiene parametros diferentes a *, devolvera los registros que coincidan PARCIALMENTE
    // con el parametro indicado. (Parcialmente: Si dentro del paramtro existe alguna cadena que coincida con 
    // algun registro de la tabla category, lo devolvera igualmente).

    const endpoint = `${api_url}/getCategory`
    const method = 'POST'
    const body = {descr: descr}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  async getCategoryByOrganization(organizationId: number){

    // Procedimiento de almacenado CategoryColletion
    // Si el parametro es igual a 0 o no se define algun parametro, devuelve todas las categorias de la tabla categoria
    // Si el parametro tiene valores, devuelve todas las categorias asociadas al ID de la organizacion indicada.

    const endpoint = `${api_url}/getCategoryByOrganization`
    const method = 'POST'
    const body = {organizationId: organizationId}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  async getCategoryLabor(categoryId:number){

    // Procedimiento de almacenado CategoryLabor
    // Devuelve registros de la tabla Labor y Category Labor
    // Devuelve los registros de la tabla CategoryLabor y labor asociados al ID de la categoria
    // que se indico en el parametro

    const endpoint = `${api_url}/getCategoryLabor`
    const method = 'POST'
    const body = {categoryId: categoryId}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  async createCategoryLabor(idCategoryLabor:number = 0){

    // Procedimiento de almacenado CategoryLaborCreate
    // Consultar rene como funciona procedimiento

    const endpoint = `${api_url}/createCategoryLabor`
    const method = 'POST'
    const body = {idCategoryLabor: idCategoryLabor}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  async updateCategoryLabor(idCategoryLabor:number = 0, categoryId: number = 0, laborId:number = 0, sort:number = 0){

    // Procedimiento de almacenado CategoryLaborUpdate

    const endpoint = `${api_url}/updateCategoryLabor`
    const method = 'POST'
    const body = {idCategoryLabor:idCategoryLabor, categoryId: categoryId, laborId: laborId, sort: sort}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  async getCategoryPart(categoryId:number){

    // Procedimiento de almacenado CategoryPartCollection
    // Obtiene los registros de la tabla CategoryPart asociados a el ID de la categoria indicada en el parametro de entrada.

    const endpoint = `${api_url}/getCategoryPart`
    const method = 'POST'
    const body = {categoryId:categoryId}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  async createCategoryPart(categoryId:number = 0){

    // Procedimiento de almacenado CategoryPartCreate
    // Crea un nuevo registro en la tabla CategoryPart
    // Si el parametro de entrada es igual a 0, borra todos los registros asociados al ID de la tabla CategoryPart

    const endpoint = `${api_url}/createCategoryPart`
    const method = 'POST'
    const body = {categoryId:categoryId}

    const response = this.api.createRequest(endpoint, method, body)

    return response


  }

  async getCategoryStep(categoryId: number){

    // Procedimiento de almacenado CategoryStep
    // Obtiene los registros asociados al parametro indicado de la tabla CategoryStep

    const endpoint = `${api_url}/getCategoryStep`
    const method = 'POST'
    const body = {categoryId:categoryId}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

  async createCategoryStep(categoryId: number){

    // procedimiento de almacenado CategoryStepCreate
    // Crea un nuevo registro en la tabla CategoryStep

    const endpoint = `${api_url}/createCategoryStep`
    const method = 'POST'
    const body = {categoryId:categoryId}

    const response = this.api.createRequest(endpoint, method, body)

    return response

  }

}
