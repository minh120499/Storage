/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Antd from 'antd'

import * as Mui from '@mui/material'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useLayoutEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ISupplier, TypeSupplier } from "../../services/customType";


import { Link, useNavigate } from "react-router-dom";
import "../../styles/Table.css";

import { IProductCount, IProductFilter } from '../../type/allType';
import { countProductByFilter, deleteProductsById, getProducts } from '../../services/productServices';
// import ProductPagination from './ProductPagination';
import { DeleteOutlined, DownOutlined, PlusOutlined, SortDescendingOutlined, StopOutlined,DownloadOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import ToastCustom from '../../features/toast/Toast';
// import { Sort } from '@mui/icons-material';
// import { margin } from '@mui/system';
const initFilter: IProductFilter = {
    key: '',
    isDelete: false,
    sortBy: 'name',
    isDesc: true,
    page: 1,
    size: 10
}
const ProductCol = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'code',
        key: 'code',
        render: (code: string) => {
            return (<Antd.Tag color={'orange'}>{code}</Antd.Tag>)
        }
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Số lượng phiên bản',
        dataIndex: "numberOfVariant",
        key: "numberOfVariant"
    },
    {
        title: "Số lượng",
        dataIndex: "total",
        key: "total"
    },
    {
        title: "Trạng thái",
        dataIndex: "total",
        key: "total",
        render: (total: number) => {
            return total > 0 ? <p style={{ color: 'blue' }}>Có thể bán</p> : <p style={{ color: 'red' }}>Hết hàng</p>
        }
    }
]



const ListProduct = () => {
    var keyWord = ''
    const [productFilter, setProductFilter] = useState<IProductFilter>(initFilter)
    const [products, setProducts] = useState<Array<IProductCount>>([])
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()
    const [totalPage, setTotalPage] = useState<number>(1);
    const [selectProduct, setSelectProduct] = useState<React.Key[]>([]);
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const loadData= ()=>{
        getProducts(productFilter).then((response) => response.json())
        .then((res) => {
            setProducts(res)

        }).catch(error => { })
    countProductByFilter(productFilter).then((response) => response.json())
        .then((res) => {
            setTotalPage(res)
        }).catch(error => {


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
            if (result.isConfirmed ) {
                deleteProductsById(selectProduct)
                .then(res => {
                    if(res.ok)
                    {
                        ToastCustom.fire({
                            icon:'success',
                            title:'Xóa thành công'
                        })
                        loadData()
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
    const handleMenuClick: Antd.MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                handleDeleteProduct() 
                break
            case '2':
                           
                break
    
        }
    };
    const menu = (
        <Antd.Menu
            onClick={handleMenuClick}
            items={[
                {
                    key: '1',
                    label: <Antd.Button style={{ width: '100%' }} type="text" danger>Xóa Sản phẩm<DeleteOutlined /></Antd.Button>,
    
                },
                // {
                //     label: <Antd.Button style={{ width: '100%' }} type="text" >Sửa sản phẩm<InfoCircleOutlined /></Antd.Button>,
                //     key: '2',
    
    
                // },
            ]}
        />
    );
    

    useLayoutEffect(() => {

       loadData()

    }, [productFilter])

    const onPageChange = (page: number, size: number) => {
        setProductFilter({ ...productFilter, page: page, size: size })

    }

    const showFilter = () => {
        setIsOpenFilter(true)
    }
    const closeFilter = () => {
        setIsOpenFilter(false)
    }
    const Products = () => {
        return (
            <>

                <Antd.Table dataSource={products}
                    sticky
                    columns={ProductCol}
                    rowKey="id"
                    pagination={false}
                    style={{ height: 550, maxHeight: 550, overflow: 'scroll' }}
                    onRow={(record) => {
                        return {
                            onClick: event => navigate({ pathname: `/products/${record.id}` }),
                        }
                    }}
                    rowSelection={{selectedRowKeys:selectProduct,
                                    onChange(selectedRowKeys, selectedRows, info) {
                                        setSelectProduct(selectedRowKeys)
                                    },}}


                />

            </>
        )
    }

    return (
        <>
            <Antd.Typography.Title>Danh sách sản phẩm</Antd.Typography.Title>
            <Antd.Drawer title="Tìm kiếm nâng cao" placement="right" onClose={closeFilter} visible={isOpenFilter}>

            </Antd.Drawer>
            <Mui.Grid container spacing={2} sx={{ mb: 2 }}>
                <Mui.Grid item xs={1.5}>
                    <Antd.Dropdown overlay={menu} >
                        <Antd.Button style={{ width: "100%", fontSize: '14px' ,margin:0}} type="primary">
                            <Antd.Space>
                                Thao tác
                                <DownOutlined />
                            </Antd.Space>
                        </Antd.Button>
                    </Antd.Dropdown>

                </Mui.Grid>
                <Mui.Grid item xs={5.5} sx={{m:0}}>
                    <Antd.Input
                        placeholder='Nhập tên hoặc mã sản phẩm'
                        onChange={(e) => {
                            keyWord = e.target.value.toString()

                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                setProductFilter({ ...productFilter, key: keyWord, page: 1 })
                        }}

                    >

                    </Antd.Input>
                </Mui.Grid>
                <Mui.Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>

                    <Antd.Button onClick={showFilter} style={{ width: "100%", margin: 0 }} type='primary'>
                        <Antd.Space>
                            <SortDescendingOutlined />
                            Tìm kiếm nâng cao
                        </Antd.Space>
                    </Antd.Button>
                </Mui.Grid>
                <Mui.Grid item xs={1}>
                    <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary" >
                        <Antd.Space>
                            <DownloadOutlined />
                            Xuất file
                        </Antd.Space>
                    </Antd.Button>
                </Mui.Grid>
                <Mui.Grid item xs={2}>
                    <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary" onClick={() => { navigate('/productsAdd') }} >
                        <Antd.Space>
                            <PlusOutlined />
                            Thêm mới
                        </Antd.Space>
                    </Antd.Button>
                </Mui.Grid>

                <Mui.Grid item xs={12} >
                    <Mui.Paper sx={{ pb: 2 }} >
                        <Products />
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <Antd.Pagination responsive style={{ marginTop: 10, marginRight: 10 }} showQuickJumper defaultCurrent={1} total={totalPage} onChange={onPageChange} pageSizeOptions={[5, 10, 20, 50, 100]} />

                        </div>

                    </Mui.Paper>
                </Mui.Grid>

            </Mui.Grid>


        </>
    )
}

export default ListProduct