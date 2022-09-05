import React, {useEffect, useState} from "react";
import {IImportInvoice} from "../../services/customType";
import {getImportInvoices} from "../../services/api";
import {Button, Table} from "antd";
import {ImportInvoiceColumn} from "../../components/Datatablesource";
import {Link, useNavigate} from "react-router-dom";

const ListImportInvoice = () =>{

    const navigate = useNavigate();
    const [importInvoices,setImportInvoices] = useState<IImportInvoice[]>([])

    useEffect(() =>{
        getImportInvoices().then((r) =>{
            setImportInvoices(r.data)
        })
    },[])
    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'35px',alignItems:"center"}}>
                <h1 style={{fontSize:'30px',margin:0,marginRight:10}}>Đơn nhập hàng</h1>
                <Link to="/purchase_orders/create">
                    <Button type="primary">Tạo mới đơn hàng</Button>
                </Link>
            </div>
            {
                    <Table dataSource={importInvoices}
                           columns={ImportInvoiceColumn.filter(col => col.dataIndex !== 'isReturn')}
                           rowKey="code"
                           pagination={{defaultPageSize: 10}}
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