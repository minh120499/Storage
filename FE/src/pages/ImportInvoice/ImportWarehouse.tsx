import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {Button} from "antd";
import React from "react";
import { PDFViewer,PDFDownloadLink } from "@react-pdf/renderer";
import PDFImportFile from "./PDFImportFile";
import {IDetailImportInvoice} from "../../services/customType";
type Props = {
    isImport: boolean,
    invoice:IDetailImportInvoice,
    createDate:string,
    importDate:string
}
const ImportWarehouse = ({isImport,invoice,createDate,importDate}:Props) =>{

    return(
        <div className="block" style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{padding: 20, paddingBottom: 5,paddingTop:0}}>
                <p style={isImport ? {marginBottom: 0, fontSize: "16px",paddingTop:20} :{marginBottom: 0, fontSize: "16px"}}>
                    <b style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: 3, display: 'flex', alignItems: 'center'}}><LocalShippingIcon/></span>
                        Nhập kho
                    </b>
                </p>
                {
                    isImport && (
                        <p style={{marginTop: 10}}>
                            <b style={{color:'#1890ff'}}>
                                Xác nhận nhập kho thành công
                            </b>
                        </p>
                    )
                }

            </div>
            <div style={{padding: 20}}>
                {
                    isImport ? (
                            <>
                                <PDFDownloadLink document={ <PDFImportFile invoice={invoice} createdDate={createDate} importDate={importDate}/>} fileName="somename.pdf">
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading document...' : 'Download now!'
                                    }
                                </PDFDownloadLink>

                            </>
                    ): (
                        <Button type='primary'>Nhập kho</Button>
                    )
                }
            </div>
        </div>
    )
}
export default ImportWarehouse