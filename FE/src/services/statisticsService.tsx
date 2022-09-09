import axios from "axios"
import { StatisticsFilter } from "../type/allType"
import { baseUrl ,getRequest} from "./productServices"

export const getStatisticsImport=(filter:StatisticsFilter)=>{

    return fetch(baseUrl+"statistics/imports",getRequest(filter, 'Post', ''))
  
  
  }
  export const getStatisticsImportExtend=(filter:StatisticsFilter)=>{

    return fetch(baseUrl+"statistics/imports/extend",getRequest(filter, 'Post', ''))
  
  
  }
  export const getInventoryById = async (id:number) => {   
    return await axios.get(`http://localhost:8080/inventories/${id}`)
}
  export default null