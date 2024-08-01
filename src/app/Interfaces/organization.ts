export type Organization = {

    id: number
    descr: string
    managerPhone: string
    supervisorPhone: string
}

export type Building = {

    id: number
    descr: string
    organizationId: number
}

export type Tower = {

    id: number
    descr: string
    buildingId: number
}

export type OrganizationUser = {

    organizationId: number
    userId: string
    username: string
}

export type OrganizationCategory = {

    organizationId: number
    categoryId: number
    categoryName: string
}
