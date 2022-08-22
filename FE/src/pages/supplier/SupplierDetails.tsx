import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ISupplier} from "../../services/customType";
import {getSupplierById} from "../../services/api";
import {Button, Col, Dropdown, Menu, MenuProps, Row, Space} from "antd";
import Moment from "react-moment";
import {DeleteOutlined, DownOutlined, InfoCircleOutlined} from "@ant-design/icons";
import SupplierUpdate from "./SupplierUpdate";

const SupplierDetails = () => {

    const { id } = useParams();
    const [supplier,setSupplier] = useState({} as ISupplier);

    useEffect(() =>{
        getSupplierById(parseInt(id as string)).then(supplier => {
            setSupplier(supplier.data)
        })
    },[])



    const [isLoadModal,setIsLoadModal] = useState(false)



    const handleMenuClick: MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                // onUpdateTrueStatus(selectedRowKeys);
                break
            case '2':
                // setIsLoadModal(true)
                break
        }
    };
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: <Link to="#">Xóa nhà cung cấp</Link>,
                    key: '1',
                    icon: <DeleteOutlined/>,
                },
                {
                    label:   <Link to="#" onClick={() => setIsLoadModal(true)}>Sửa nhà cung cấp</Link>,
                    key: '2',
                    icon: <InfoCircleOutlined/>,

                },
            ]}
        />
    );


    return (
        <>
            {
               supplier && (
                   <>
                       <div style={{background:"white",margin:20}}>
                           <div style={{padding:20,display:'flex',justifyContent:'space-between',paddingBottom:0}}>
                               <div>
                                   Thong tin khac
                               </div>
                               <div>
                                   <Dropdown overlay={menu} >
                                       <div style={{width: "190px", fontSize: '14px',textAlign:'center'}}>
                                           <Space>
                                               Thao tác khác
                                               <DownOutlined/>
                                           </Space>
                                       </div>
                                   </Dropdown>
                               </div>
                           </div>
                           <hr/>
                           <div style={{padding:'20px'}}>
                               <Row>
                                   <Col span={8}>
                                       <Row>
                                           <Col span ={8}>
                                               <p>Tên nhà cung cấp: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>{supplier.name}</b>
                                           </Col>
                                       </Row>
                                       <Row>
                                           <Col span ={8}>
                                               <p>Mã nhà cung cấp: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>{supplier.code}</b>
                                           </Col>
                                       </Row>
                                       <Row>
                                           <Col span ={8}>
                                               <p>SĐT nhà cung cấp: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>{supplier.phone}</b>
                                           </Col>
                                       </Row>
                                   </Col>
                                   <Col span={8}>
                                       <Row>
                                           <Col span ={8}>
                                               <p>Email nhà cung cấp: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>{supplier.email}</b>
                                           </Col>
                                       </Row>
                                       <Row>
                                           <Col span ={8}>
                                               <p>Địa chỉ nhà cung cấp: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>{supplier.address}</b>
                                           </Col>
                                       </Row>
                                       <Row>
                                           <Col span ={8}>
                                               <p>Nhân viên phụ trách: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>{supplier.accountId}</b>
                                           </Col>
                                       </Row>
                                   </Col>
                                   <Col span={8}>
                                       <Row>
                                           <Col span ={8}>
                                               <p>Thời giạn tạo: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>
                                                   <Moment format="DD/MM/YYYY HH:mm:ss">
                                                       {supplier.createdAt}
                                                   </Moment>
                                               </b>
                                           </Col>
                                       </Row>
                                       <Row>
                                           <Col span ={8}>
                                               <p>Thời gian cập nhập: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>
                                                   <Moment format="DD/MM/YYYY HH:mm:ss">
                                                       {supplier.updateAt}
                                                   </Moment>
                                               </b>
                                           </Col>
                                       </Row>
                                       <Row>
                                           <Col span ={8}>
                                               <p>Trạng thái giao dịch: </p>
                                           </Col>
                                           <Col span={12}>
                                               <b style={{textTransform:"uppercase"}}>{
                                                   supplier.statusTransaction ? (
                                                       <p style={{ color: 'blue' }}>Đang giao dịch</p>
                                                   ) : ( <p style={{ color: 'red' }}>Ngừng giao dịch</p>)
                                               }</b>
                                           </Col>
                                       </Row>
                                   </Col>
                               </Row>
                           </div>
                       </div>
                       {isLoadModal && <SupplierUpdate supplier={supplier} isVisible={isLoadModal} setIsVisible={() =>setIsLoadModal(false)}/>}
                   </>
                )
            }
        </>
    )
}
export default SupplierDetails