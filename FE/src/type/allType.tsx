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
    id: number,
    code: string,
    name: string,
    description:string|null,
    createAt: string,
    updateAt: string,
    isDelete: boolean

}
export interface Option{
    id:number|any,
    productId:number|null
    name:string
}
export interface OptionValue{
    id:number|any,
    optionId:number|null,
    name:string
}

export interface AddProductInput{
    name:string,
    description:string|null,

}