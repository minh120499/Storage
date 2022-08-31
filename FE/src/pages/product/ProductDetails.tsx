import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import { ISupplier } from "../../services/customType";
import { Button, Col, Dropdown, Menu, MenuProps, Row, Space } from "antd";
import Moment from "react-moment";
import { DeleteOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined } from "@ant-design/icons";
import * as Mui from '@mui/material'
import * as Antd from 'antd'
import { deleteProductById, deleteVariantsById, getProductById } from "../../services/productServices";
import { IVariant, Product } from "../../type/allType";
import { has } from "immer/dist/internal";
import Swal from "sweetalert2";
import ToastCustom from "../../features/toast/Toast";

const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState<Product>()
    const [variants, setVariants] = useState<IVariant[]>()
    const [focusVariant, setFocusVariant] = useState<IVariant>()
    const [isUpdate, setIsUpdate] = useState(false)
    const navigate=useNavigate()
    const loadData = () => {
        getProductById(Number(id)).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            setProduct(data.product)
            setVariants(data.variants)
            setFocusVariant(data.variants[0])
        })
            .catch(error => {
                console.log(error);

            })
    }

    const handleDeleteProduct = () => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn không thể hồi phục lại dữ liệu!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed && product?.id) {
                deleteProductById(product.id)
                .then(res => {
                    if(res.ok)
                    {
                        ToastCustom.fire({
                            icon:'success',
                            title:'Xóa thành công'
                        })
                        navigate('/products')
                    }
                 })
                .catch(error => {
                    ToastCustom.fire(
                        {
                            icon: 'error',
                            title: 'Xóa Thất bại'

                        }
                    )

                })
            }

        })

    }
    useEffect(() => {

        loadData()
    }, [])



    const handleMenuClick: MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                handleDeleteProduct()
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
                    key: '1',
                    label: <Antd.Button style={{ width: '100%' }} type="text" danger>Xóa Sản phẩm<DeleteOutlined /></Antd.Button>,

                },
                {
                    label: <Antd.Button style={{ width: '100%' }} type="text" >Sửa sản phẩm<InfoCircleOutlined /></Antd.Button>,
                    key: '2',


                },
            ]}
        />
    );

    const Product = () => {
        return (

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
                                        <p >{product?.name}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <p>Mã sản phẩm: </p>
                                    </Col>
                                    <Col span={12}>
                                        <Antd.Tag color='orange'>{product?.code}</Antd.Tag>
                                    </Col>
                                </Row>

                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={8}>
                                        <p>Ngày tạo: </p>
                                    </Col>
                                    <Col span={12}>
                                        <Moment format="DD/MM/YYYY HH:mm:ss">
                                            {product?.createAt}
                                        </Moment>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <p>Ngày cập nhật: </p>
                                    </Col>
                                    <Col span={12}>
                                        <Moment format="DD/MM/YYYY HH:mm:ss">
                                            {product?.createAt}
                                        </Moment>

                                    </Col>
                                </Row>

                            </Col>
                            <Col span={8}>
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

        )
    }
    const Variants = memo((props: any) => {
        const variantCol = [
            {
                title: 'Mã SP',
                dataIndex: 'code',
                key: 'code',
                width: '15%',
                render: (code: string) => {
                    return (<Antd.Tag color='orange'> {code}</Antd.Tag>)
                }
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'name',
                key: 'name',

            }, {
                title: 'Tồn kho',
                dataIndex: 'code',
                key: 'code',


            }, {
                title: 'Tổng',
                dataIndex: 'code',
                key: 'code',

            }
        ]
        const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
        const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const handleOnDeleteVariants = () => {
            Swal.fire({
                title: 'Bạn có chắc?',
                text: "Bạn không thể hồi phục lại dữ liệu!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete!'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(selectedRowKeys)
                    deleteVariantsById(selectedRowKeys).then((response: any) => {
                        if (response.ok) {
                            ToastCustom.fire({
                                icon: 'success',
                                title: 'Xóa phiên bản thành công'
                            }).then()
                            loadData()
                        }
                    }
                    )
                        .catch((error: any) => {
                            ToastCustom.fire({
                                icon: 'error',
                                title: 'Có lỗi xảy ra'
                            }).then()
                        })
                }

            })


        }



        return (
            <>
                <Antd.Row style={{}}>
                    <Antd.Col span={8}>
                        <p>Các phiên bản: </p>

                    </Antd.Col>
                    <Antd.Col span={8}>
                        {hasSelected ? <span>Đang chọn {selectedRowKeys.length} phiên bản</span> : null}

                    </Antd.Col>
                    <Antd.Col span={8} style={{ display: 'flex', justifyContent: 'right' }}>
                        <Antd.Button disabled={!hasSelected} icon={<DeleteOutlined />} danger onClick={handleOnDeleteVariants} >Xóa</Antd.Button>

                    </Antd.Col>
                </Antd.Row>
                <Mui.Paper>


                    <Antd.Table dataSource={props.variants}
                        sticky
                        columns={variantCol}
                        rowKey="id"
                        pagination={{ pageSize: 6 }}
                        style={{ height: 400 }}
                        onRow={(record) => {

                            return {
                                onClick: event => {
                                    props.setVariant(record)
                                }
                            }
                        }}
                        rowSelection={rowSelection}
                    >

                    </Antd.Table>
                </Mui.Paper>

            </>

        )
    })
    const VariantDetails = (props: any) => {

        return (
            <>
                <p>Thông tin chi tiết</p>
                <Mui.Paper sx={{ pl: 5, pt: 2, height: 400 }}>


                    <Antd.Row >

                        <Antd.Col span={8}><p>Tên:</p></Antd.Col>
                        <Antd.Col span={8}><p>{props.variant?.name}</p></Antd.Col>

                    </Antd.Row>
                    <Antd.Row>
                        <Antd.Col span={8}><p>Mã:</p></Antd.Col>
                        <Antd.Col span={8}><Antd.Tag color='orange'> {props.variant?.code}</Antd.Tag></Antd.Col>

                    </Antd.Row>
                    <Antd.Row>
                        <Antd.Col span={8}><p>Giá nhập:</p></Antd.Col>
                        <Antd.Col span={8}><p>{(props.variant?.importPrice + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p></Antd.Col>

                    </Antd.Row>
                    <Antd.Row>
                        <Antd.Col span={8}><p>Giá bán lẻ:</p></Antd.Col>
                        <Antd.Col span={8}><p>{(props.variant?.salePrice + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p></Antd.Col>

                    </Antd.Row>
                    <Antd.Row>
                        <Antd.Col span={8}><p>Giá bán buôn:</p></Antd.Col>
                        <Antd.Col span={8}><p>{(props.variant?.wholesalePrice + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p></Antd.Col>

                    </Antd.Row>
                </Mui.Paper>

            </>


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



            <Product />
            <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={6}>

                    <Variants setVariant={setFocusVariant} variants={variants} />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                    <VariantDetails variant={focusVariant} />
                </Mui.Grid>


            </Mui.Grid>
        </>

    )
}
export default ProductDetails