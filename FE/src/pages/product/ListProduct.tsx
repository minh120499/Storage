import * as Antd from 'antd'

import * as Mui from '@mui/material'


import React, { useEffect, useState } from "react";
import { ISupplier, TypeSupplier } from "../../services/customType";


import { Link, useNavigate } from "react-router-dom";
import "../../styles/Table.css";

import { IProductCount, IProductFilter } from '../../type/allType';
import { countProductByFilter, getProducts } from '../../services/productServices';
import ProductPagination from './ProductPagination';
import { PlusOutlined } from '@ant-design/icons';
import { margin } from '@mui/system';
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

    const [productFilter, setProductFilter] = useState<IProductFilter>(initFilter)
    const [products, setProducts] = useState<Array<IProductCount>>([])
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()
    const [totalPage, setTotalPage] = useState<number>(1);
    const [selectProduct, setSelectProduct] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectProduct(newSelectedRowKeys);
    };

    const rowSelection = {
        selectProduct,
        onChange: onSelectChange,
    };


    let hasSelected = selectProduct.length > 0;
    let hasOneSelected = selectProduct.length === 1;
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setProductFilter({ ...productFilter, page: page })

    }
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {

        setProductFilter({ ...productFilter, size: Number(event.target.value), page: 1 })

    };


    useEffect(() => {
        getProducts(productFilter).then((response) => response.json())
            .then((res) => {
                setProducts(res)

            }).catch(error=>{})

    }, [productFilter])
    useEffect(() => {
        countProductByFilter(productFilter).then((response) => response.json())
            .then((res) => {
                setTotalPage(res)
            }).catch(error=>{})

    }, []) 

    const Products = () => {
        return (
            <>

                <Antd.Table dataSource={products}
                    scroll={{ x: 500, y: 500 }}
                    columns={ProductCol}
                    rowKey="id"
                    bordered
                    pagination={false}

                    onRow={(record) => {
                        return {
                            onClick: event => navigate({ pathname: `/products/${record.id}` }),
                        }
                    }}
                    rowSelection={rowSelection}


                />

                <Mui.TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100, 200]}
                    count={totalPage}
                    rowsPerPage={productFilter.size}
                    page={productFilter.page}
                    labelDisplayedRows={() => {
                        return (
                            <>
                                <Antd.InputNumber  value={productFilter.page} ></Antd.InputNumber> /{Math.ceil(totalPage / productFilter.size)}
                            </>
                        )
                    }}
                    component='div'
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={ProductPagination}
                    style={{ verticalAlign: "center" }}
                />
            </>
        )
    }

    return (
        <>
            <Antd.Typography.Title>Danh sách sản phẩm</Antd.Typography.Title>

            <Mui.Grid container spacing={2} sx={{ mb: 2 }}>
                <Mui.Grid item xs={2}>
                    <Antd.Input  >
                    </Antd.Input>

                </Mui.Grid>
                <Mui.Grid item xs={8}>
                    <Antd.Input
                        placeholder='Nhập tên hoặc mã sản phẩm'
                        onChange={(e) => {
                            setProductFilter({ ...productFilter, key: e.target.value.toString() })
                        }}
                    >

                    </Antd.Input>
                </Mui.Grid>
                <Mui.Grid item xs={2}>
                    <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary">
                        <Antd.Space>
                            <PlusOutlined />
                            Thêm mới
                        </Antd.Space>
                    </Antd.Button>
                </Mui.Grid>
                <Mui.Grid item xs={12}>
                    <Products />
                </Mui.Grid>
            </Mui.Grid>


        </>
    )
}

export default ListProduct