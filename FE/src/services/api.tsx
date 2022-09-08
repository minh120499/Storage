/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React from "react";
let configValue : string | undefined  = process.env.REACT_APP_API

export const getSuppliers = async () => { 
    return await axios.get(`http://localhost:8080/api/suppliers/findAll`)
}
export const createSupplier = async (supplier:object)=>{
    return axios.post(`http://localhost:8080/api/suppliers`,supplier)
}
export const deleteSupplier = async (listId:React.Key[])=>{
    return axios.put(`http://localhost:8080/api/suppliers/delete`,listId)
}
export const updateStatusSupplier = async (listId:React.Key[],status:string)=>{
    return axios.put(`http://localhost:8080/api/suppliers/updateStatus/${status}`,listId)
}
export const updateSupplier = async (supplier:object)=>{
    return axios.put(`http://localhost:8080/api/suppliers`,supplier)
}
export const getSupplierById = async (id:number) => {   
    return await axios.get(`http://localhost:8080/api/suppliers/${id}`)
}

export const getProvince = async () =>{
    return await axios.get(`https://provinces.open-api.vn/api/p`)
}

export const getDistrict= async (code:string) =>{
    return await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
}
export const getWard= async (code:string) =>{
    return await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
}

export const getProductVariant = async (pageNumber:number,searchValue:string) => {
    return await axios.get(`http://localhost:8080/api/product-variants/findProductVariant?pageNumber=${pageNumber}&pageSize=7&searchValue=${searchValue}`)
}
export const getCountTotalProductVariant = async (searchValue:string) => {
    return await axios.get(`http://localhost:8080/api/product-variants/count-total?searchValue=${searchValue}`)
}
export const createImport = async (im: object) => {
    return await axios.post(`http://localhost:8080/api/imports/`,im)
}
export const getImportInvoices = async (value:string) => {
    return await axios.get(`http://localhost:8080/api/imports/findAll?searchValue=${value}`)
}
export const getDetailImportInvoice = async (code:string) =>{
    return await axios.get(`http://localhost:8080/api/imports/getDetails/${code}`)
}
export const updateStatusInvoice = async (importId: number, status: string) =>{
    return await axios.put(`http://localhost:8080/api/imports/updateStatus?id=${importId}&status=${status}`)
}
export const updateStatusReturnInvoice = async (importId: number, status: string) =>{
    return await axios.put(`http://localhost:8080/api/imports/updateStatusReturn?id=${importId}&status=${status}`)
}
export const getHistoryStatusImportInvoice = async (importId: number) =>{
    return await axios.get(`http://localhost:8080/api/imports/getStatusHistory/${importId}`)
}

export const getImportReturn = async (code: string) =>{
    return await axios.get(`http://localhost:8080/api/imports/getReturnImport/${code}`)
}

export const returnImportInvoice = async (obj:object,inventoryId:number) => {
    return await axios.post(`http://localhost:8080/api/return_import/${inventoryId}`,obj)
}

export const getDetailsImportReturn = async (code: string) =>{
    return await axios.get(`http://localhost:8080/api/imports/getDetailsReturnImport/${code}`)
}

export const getCurrentQuantityInventory = async (id: number) =>{
    return await axios.get(`http://localhost:8080/inventories/getCurrentQuantityInventory/${id}`)
}