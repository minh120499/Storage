import React, {useEffect, useState} from "react";
import {IImportInvoice} from "../../services/customType";
import {getImportInvoices} from "../../services/api";
import {Table} from "antd";
import {ImportInvoiceColumn} from "../../components/Datatablesource";
import {useNavigate} from "react-router-dom";

const ListImportInvoice = () =>{

    const navigate = useNavigate();
    const [importInvoices,setImportInvoices] = useState<IImportInvoice[]>([])

    useEffect(() =>{
        getImportInvoices().then((r) =>{
            setImportInvoices(r.data.reverse())
        })
    },[])
    return(
        <div>
            <div>Nhà cung cấp</div>
            <div style={{marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between"}}>


            </div>
            {
                    <Table dataSource={importInvoices}
                           columns={ImportInvoiceColumn}
                           rowKey="code"
                           pagination={{defaultPageSize: 5}}
                           onRow={(record) => {
                               return {
                                   onClick: event => navigate({pathname: `/purchase_orders/details/${record.code}`}),
                               }
                           }}
                           // rowSelection={rowSelection}
                    />
            }

        </div>
    )
}
export default ListImportInvoice