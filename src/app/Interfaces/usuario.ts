export interface User {

    id?: string
    name:string
    username: string
    position:number
    email:string
    phone_number: string
    password?: string
    
}

export type UserRole = {

    user_id: string,
    role_id: string

}

export type Role = {
    
    id?: string
    name_role: string
    normalized_name: string
    concurrencyStamp:string

}

export type RoleClaim = {

    id: number
    role:Role
    claim_type: string
    claim_value: string
}

export type UserLogin = {

    login_provider: string
    provider_key: string
    provider_display_name: string
    user: User
}

export type UserToken = {

    user: User
    login_provider: string
    name: string
    value:string

}

export type UserClaim = {

    id: number
    user: User
    claim_type: string
    claim_value: string

}

export enum Position {

    Administrador = "Administrador",
    Supervisor = "Supervisor",
    Tecnico = "Tecnico",
    Ayudante = "Ayudante", 
    Cliente = "Cliente"

}