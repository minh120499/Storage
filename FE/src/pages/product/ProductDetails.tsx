import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ISupplier } from "../../services/customType";
import { Button, Col, Dropdown, Menu, MenuProps, Row, Space } from "antd";
import Moment from "react-moment";
import { DeleteOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined } from "@ant-design/icons";
import * as Mui from '@mui/material'
import * as Antd from 'antd'
import { getProductById } from "../../services/productServices";
const variantCol = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    }
]
const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState<any>()
    const [variants,setVariants]=useState()
    const [isUpdate,setIsUpdate]=useState(false)

    useEffect(() => {

        getProductById(Number(id)).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            setVariants(data.variants)
        })
            .catch(error => {
                console.log(error);

            })


    }, [])



    const [isLoadModal, setIsLoadModal] = useState(false)



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
                    icon: <DeleteOutlined />,
                },
                {
                    label: <Link to="#" onClick={() => setIsLoadModal(true)}>Sửa nhà cung cấp</Link>,
                    key: '2',
                    icon: <InfoCircleOutlined />,

                },
            ]}
        />
    );

    const Variants=()=>{
        return (
            <Antd.Table dataSource={variants}
            sticky
            columns={variantCol}
            rowKey="id"
            pagination={false}
            style={{ height: 300, maxHeight: 300, overflow: 'scroll' }}
            onRow={(record) => {
                return {
                }
            }}
            rowSelection={undefined}
            >

            </Antd.Table>
        )
    }

    return (
        <>


            <div>
                <h2 style={{ margin: 20 }}>
                    <Link to="/products">
                        <LeftOutlined /> Danh sách sản phẩm
                    </Link>
                </h2>

            </div>




            <Mui.Paper>
                <div style={{ background: "white", margin: 20 }}>
                    <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', paddingBottom: 0 }}>
                        <div>
                            Thông tin sản phẩm
                        </div>
                        <div>
                            <Dropdown overlay={menu} >
                                <div style={{ width: "190px", fontSize: '14px', textAlign: 'center' }}>
                                    <Space>
                                        Thao tác khác
                                        <DownOutlined />
                                    </Space>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    <hr />
                    <div style={{ padding: '20px' }}>
                        <Row>
                            <Col span={8}>
                                <Row>
                                    <Col span={8}>
                                        <p>Tên sản phẩm: </p>
                                    </Col>
                                    <Col span={12}>
                                        <b style={{ textTransform: "uppercase" }}>vidu</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <p>Mã sản phẩm: </p>
                                    </Col>
                                    <Col span={12}>
                                        <b style={{ textTransform: "uppercase" }}></b>
                                    </Col>
                                </Row>

                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={8}>
                                        <p>Ngày tạo: </p>
                                    </Col>
                                    <Col span={12}>
                                        <b style={{ textTransform: "uppercase" }}></b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <p>Ngày cập nhật: </p>
                                    </Col>
                                    <Col span={12}>
                                        <b style={{ textTransform: "uppercase" }}></b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <p>Trạng thái sản phẩm: </p>
                                    </Col>
                                    <Col span={12}>
                                        <b style={{ textTransform: "uppercase" }}></b>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </div>
            </Mui.Paper>

            <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={6}>
                    <Mui.Paper>
                        <Variants/>
                    </Mui.Paper>
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                    <Mui.Paper>
                        hekko
                    </Mui.Paper>
                </Mui.Grid>


            </Mui.Grid>
        </>

    )
}
export default ProductDetails