export interface User {

    id?: string
    name:string
    position:number
    signature: string
    organizacion_id: number
    username: string,
    normalized_username:string
    email:string
    normalized_email:string
    email_confirmed: boolean
    password_hash: string
    security_stamp: string
    concurrency_stamp:string
    phone_number: string,
    phone_number_confirmed:boolean
    two_factor_enabled: boolean
    password: string,
    lockout_end: string
    lockout_enabled: boolean
    acces_failed_count: number
    
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