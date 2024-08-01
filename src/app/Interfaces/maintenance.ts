export type Maintenance = {

    equipmentId: number
    supervisorId: string
    supervisorName: string
    technicianId: string
    technicionName: string
    helperId: string
    helperName: string
    programed: string
    finished?: string
    status: MaintenanceStatus
    observation?: string
    ObservationVisibleInPdf: boolean
    images?: string

}

export enum MaintenanceStatus {

    Selecciona,
    Asignada,
    Iniciada,
    Acceso,
    Repuesto,
    Finalizada,

}

export type MaintenanceFilter = {

    id: number
    equipmentId: number
    organizationId: number
    categoryId: number
    physicalFile: string
    maintenanceStatus: MaintenanceStatus.Selecciona
    month: number
    year: number

}

export type MaintenanceLabor = {

    maintenanceId: number
    laborId: number
    finished: boolean
    
}

export type MaintenanceMeasurement = {

    maintenanceId: number
    measurementId: number
    measurementDescr: string
    partId?: number
    partDescr?: string
    measurementStepId: number
    measurementStepDescr: string
    measurementValue?: number

}


