import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getDetailImportInvoice, getHistoryStatusImportInvoice, updateStatusInvoice} from "../../services/api";
import {IDetailImportInvoice, IHistoryStatus} from "../../services/customType";
import {Button, Col, Row, Steps, Table, Tag} from "antd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {ShopFilled,} from '@ant-design/icons';
import {columnsDetailImportInvoice} from "../../components/Datatablesource";
import ToastCustom from "../../features/toast/Toast";
import ImportInvoiceHistory from "./ImportInvoiceHistory";
import PaymentImport from "./PaymentImport";
import ImportWarehouse from "./ImportWarehouse";

const DetailImportInvoice = () => {

    const {code} = useParams();

    const [detailInvoices, setDetailInvoices] = useState<IDetailImportInvoice>();
    const [reload, setReload] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(0);
    const [invoiceStatusHistory, setInvoiceStatusHistory] = useState<IHistoryStatus[]>([])

    useEffect(() => {
        getDetailImportInvoice(code as string).then(result => {
            setDetailInvoices(result.data)
            result.data.anImport.isDone && setCurrentStatus(2)
            getHistoryStatusImportInvoice(result.data?.anImport.id as number).then((result) => {
                setInvoiceStatusHistory(result.data)
            })
        })
    }, [reload])


    const {Step} = Steps;

    const updateStatusPaidPayment = () => {
        const importId = detailInvoices?.anImport.id as number
        updateStatusInvoice(importId, "paidPayment").then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: 'Xác nhận thanh toán thành công'
            }).then()
            setReload(!reload)
        })

    }
    const updateStatusImportWarehouse = () => {
        const importId = detailInvoices?.anImport.id as number
        updateStatusInvoice(importId, "importWarehouse").then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: 'Xác nhận nhập kho thành công'
            }).then()
            setReload(!reload)
        })
    }

    return (
        <div>
            {
                detailInvoices && (<div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <h1>{detailInvoices?.anImport.code}</h1>
                        </div>
                        <div style={{width:'45%'}}>
                            {  (() => {
                                if (invoiceStatusHistory.length === 3) {
                                    return (
                                        <Steps current={currentStatus}>
                                            <Step title="Đặt hàng" description={invoiceStatusHistory[2].createdAt}/>
                                            <Step title="Nhập kho" description={invoiceStatusHistory[1].createdAt}/>
                                            <Step title="Hoàn thành" description={invoiceStatusHistory[0].createdAt}/>
                                        </Steps>
                                    )
                                } else if (invoiceStatusHistory.length === 2 && invoiceStatusHistory[0].statusName === 'Tạo phiếu nhập kho') {
                                    return (
                                        <Steps current={currentStatus+1}>
                                            <Step title="Đặt hàng" description={invoiceStatusHistory[1].createdAt}/>
                                            <Step title="Nhập kho" description={invoiceStatusHistory[0].createdAt}/>
                                            <Step title="Hoàn thành"/>
                                        </Steps>
                                    )
                                }else if (invoiceStatusHistory.length === 2 && invoiceStatusHistory[0].statusName === 'Thanh toán hóa đơn nhập hàng') {
                                    return (
                                        <Steps current={currentStatus}>
                                            <Step title="Đặt hàng" description={invoiceStatusHistory[1].createdAt}/>
                                            <Step title="Nhập kho"/>
                                            <Step title="Hoàn thành"/>
                                        </Steps>
                                    )
                                }
                                else if (invoiceStatusHistory.length === 1) {
                                    return (
                                        <Steps current={currentStatus}>
                                            <Step title="Đặt hàng" description={invoiceStatusHistory[0].createdAt}/>
                                            <Step title="Nhập kho"/>
                                            <Step title="Hoàn thành"/>
                                        </Steps>
                                    )
                                }
                            })()}
                        </div>
                    </div>
                    <div style={{marginTop: '45px'}}>
                        <Row gutter={24}>
                            <Col span={16}>
                                <div className="block" style={{padding: 0}}>
                                    <div style={{padding: 20, paddingBottom: 5, marginBottom: 5}}>
                                        <p style={{margin: 0, fontSize: "16px"}}><b>Thông tin nhà cung cấp</b></p>
                                    </div>
                                    <hr style={{margin: 0}}/>
                                    <div style={{padding: 20}}>
                                        <Row>
                                            <Link to='#' style={{marginBottom: 20}}>
                                                <b style={{textTransform: "uppercase"}}>
                                                    <span><ShopFilled/></span> {detailInvoices.supplier.name}
                                                </b>
                                            </Link>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <Row>
                                                    <Col span={3}>
                                                        <p>Mã: </p>
                                                    </Col>
                                                    <Col span={21}>
                                                        <b>{detailInvoices.supplier.code}</b>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={3}>
                                                        <p>Email: </p>
                                                    </Col>
                                                    <Col span={21}>
                                                        <b>{detailInvoices.supplier.email}</b>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Col span={5}>
                                                        <p>Trạng thái: </p>
                                                    </Col>
                                                    <Col span={19}>
                                                        <b>
                                                            {detailInvoices.supplier.statusTransaction ?
                                                                <Tag color="success">Đang giao dịch</Tag> :
                                                                <Tag color="error">Ngừng giao dịch</Tag>}
                                                        </b>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={5}>
                                                        <p>Địa chỉ: </p>
                                                    </Col>
                                                    <Col span={19}>
                                                        <b>{detailInvoices.supplier.address}</b>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                                <div className="block" style={{padding: 0}}>
                                    <div style={{padding: 20, paddingBottom: 5, marginBottom: '5px'}}>
                                        <p style={{marginBottom: 0, fontSize: "16px"}}><b>Thông tin sản phẩm</b></p>
                                    </div>
                                    <hr/>
                                    <div style={{padding: 20}}>
                                        {
                                            detailInvoices.anImport.detailsImports.length &&
                                            <Table
                                                rowKey="id"
                                                columns={columnsDetailImportInvoice}
                                                dataSource={detailInvoices.anImport.detailsImports}
                                                pagination={false}
                                            />
                                        }
                                    </div>
                                </div>

                                <PaymentImport total={detailInvoices?.anImport.totalPrice}
                                               isPaid={detailInvoices?.anImport.isPaid}/>

                               <ImportWarehouse createDate={invoiceStatusHistory[0].createdAt}
                                                importDate ={invoiceStatusHistory[1].createdAt}
                                                invoice={detailInvoices} isImport={detailInvoices?.anImport.isImport}/>
                            </Col>
                            <Col span={8}>
                                <div className="block" style={{padding: 0}}>
                                    <div style={{
                                        padding: 20,
                                        paddingBottom: 5,
                                        marginBottom: '5px',
                                        display: "flex",
                                        justifyContent: 'space-between'
                                    }}>
                                        <p style={{marginBottom: 0, fontSize: "16px"}}>
                                            <b>Thông tin đơn nhập</b>
                                        </p>
                                        {
                                            detailInvoices.anImport.isDone ?
                                                <Tag color="success">Hoàn thành</Tag> :
                                                <Tag color="warning">Đang giao dịch</Tag>
                                        }
                                    </div>
                                    <hr/>
                                    <div style={{padding: 20}}>
                                        <Row>
                                            <Col span={8}>
                                                Kho :
                                            </Col>
                                            <Col span={12}>
                                                {detailInvoices.inventoryName}
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop: 10}}>
                                            <Col span={8}>
                                                Ngày hẹn giao :
                                            </Col>
                                            <Col span={12}>
                                                {detailInvoices.anImport.deliveryDate === "0" ? "----" : detailInvoices.anImport.deliveryDate}
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="block" style={{padding: 0}}>
                                    <div style={{padding: 20}}>
                                        <ImportInvoiceHistory reload={reload} data={invoiceStatusHistory}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {
                            !detailInvoices.anImport.isDone && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    borderTop: '1px solid #dfe4e8',
                                    paddingTop: '15px',
                                    marginTop: ' 50px'
                                }}>
                                    {
                                        !detailInvoices.anImport.isPaid &&
                                        <Button onClick={updateStatusPaidPayment} type='default'>Xác nhận thanh toán</Button>
                                    }
                                    {
                                        !detailInvoices.anImport.isImport &&
                                        <Button onClick={updateStatusImportWarehouse} type='primary'>Xác nhận nhập kho</Button>
                                    }
                                </div>
                            )
                        }

                    </div>

                </div>)
            }
        </div>
    )
}
export default DetailImportInvoice