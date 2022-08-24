import { NullLiteral } from "typescript"

export interface Supplier {
    id: number,
    code: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    accountId: number,
    createAt: string,
    updateAt: string,
    isDelete: boolean

}
export interface Category  {
    id: number,
    name: string,
    description: string
}

export interface TransportCompany{
    id: number,
    code: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    accountId: number,
    createAt: string,
    updateAt: string,
    isDelete: boolean
}

export interface Product {
    id?: number,
    code?: string,
    name: string,
    description?: string | null,
    statusId: number | null,
    supplierId: number | null,
    accountId: number,
    createAt?: string,
    updateAt?: string,
    isDelete?: boolean

}
export interface Option {
    id: number | any,
    productId: number | null
    name: string
}
export interface OptionValue {
    id: number | any,
    optionId: number | null,
    name: string
}

export interface AddProductInput {
    id?: number | null,
    code?: string | null,
    productId?: number | null
    name: string,
    description: string | null,
    wholesalePrice: number,
    salePrice: number,
    importPrice: number

}
export interface IVariant {
    id?: number | null,
    code?: string | null,
    productId?: number | null
    name: string,
    image?: string | null,
    wholesalePrice: number,
    salePrice: number,
    importPrice: number


}

export interface IProductCount {
    id?: number,
    code?: string,
    name: string,
    description?: string | null,
    statusId: number | null,
    supplierId: number | null,
    accountId: number,
    createAt?: string,
    updateAt?: string,
    isDelete?: boolean,
    numberOfVariant: number,
    total: number
}
export interface IProductFilter {
    key:string,
    isDelete: boolean,
    sortBy:string|null,
    isDesc:boolean,
    page:number,
    size:number
}
