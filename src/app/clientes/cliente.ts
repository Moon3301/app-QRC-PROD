import { Usuario } from "./usuario"

export interface Cliente {

    id: number
    nombre: string
    telefono_jefe_area: string
    telefono_supervisor_area: string
    usuarios: Usuario[]
    
}
