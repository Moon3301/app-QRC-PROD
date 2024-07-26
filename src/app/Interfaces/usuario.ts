export interface Usuario {

    id: number
    email:string
    nombre:string
    cargo:Cargo
    username: string,
    password: string,
    telefono: string,
    roles: any[]

}

export interface Cargo {
    
    id: number
    nombre: string
}

export enum Position {

    Administrador = "Administrador",
    Supervisor = "Supervisor",
    Tecnico = "Tecnico",
    Ayudante = "Ayudante", 
    Cliente = "Cliente"

}