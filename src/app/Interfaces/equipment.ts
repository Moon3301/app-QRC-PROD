export type Equipment = {

    id: number;
    QR: number;
    organizationId: number;
    buildingId: number;
    towerId: number;
    shift: Shift.Selecciona;
    priority: Priority.Selecciona;
    categoryId: number;
    descr: string;
    location: string;
    physicalFile: string;
    asset: string;
    brand: string;
    model: string;
    serial: string;
    accreditation: boolean;
    calendar: EquipmentCalendar.Selecciona;
    lastMaintenance: string;
    nextMaintenance: string;
    deleted: boolean;
    parts: EquipmentPart[];

}

export type EquipmentPart = {

    id: number;
    equipmentId: number;
    partId: number;
    nominalValue: number;
}

export type EquipmentFilter = {

    id: number;
    organizationId: number;
    priority: Priority;
    shift: Shift;
    categoryId: number;
    calendar: EquipmentCalendar;
    asset: string;
    descr: string;
    location: string;
    physicalFile: string;
    serial: string;
    brand: string;
    model: string;
    accreditation: boolean;
    month: number;
}

export interface EquipmentItem {
    qr: number;
    organizationId: number;
    buildingId: number;
    towerId: number;
    organization: string;
    building: string;
    tower: string;
    shift: Shift;
    priority: Priority;
    categoryId: number;
    category: string;
    descr: string;
    location: string;
    physicalFile: string;
    asset: string;
    serial: string;
    brand: string;
    model: string;
    accreditation: boolean;
    hasObservation: boolean;
    deleted: boolean;
    calendar: EquipmentCalendar;
    lastMaintenance: string;
    programmed: string;
    images: string;
    hasImages: boolean;
  }

export enum EquipmentCalendar {
    Selecciona = 0,
    Quincenal = 15,
    Mensual = 1,
    Bimestral = 2,
    Trimestral = 3,
    Cuatrimestral = 4,
    Semestral = 6,
    Anual = 12
  }
  
  export enum Shift {
    Selecciona,
    DIA,
    NOCHE
  }
  
  export enum Priority {
    Selecciona = 0,
    UNO = 1,
    DOS = 2,
    TRES = 3,
    CUATRO = 4
  }