import * as Antd from 'antd'

import * as Mui from '@mui/material'


import React, { useEffect, useState } from "react";
import { ISupplier, TypeSupplier } from "../../services/customType";


import { Link, useNavigate } from "react-router-dom";
import "../../styles/Table.css";

import { IProductCount, IProductFilter } from '../../type/allType';
import { countProductByFilter, getProducts } from '../../services/productServices';
import ProductPagination from './ProductPagination';
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
    }]
// {
//     title: "Trạng thái",
//     dataIndex: "statusTransaction",
//     key: "status",
//     render: (status: boolean) => {
//         return status ? <p style={{ color: 'blue' }}>Đang giao dịch</p> : <p style={{ color: 'red' }}>Ngừng giao dịch</p>
//     },



const ListProduct = () => {

    const [productFilter, setProductFilter] = useState<IProductFilter>(initFilter)
    const [products, setProducts] = useState<Array<IProductCount>>([])
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()
    const [totalPage, setTotalPage] = useState<number>(1);
    useEffect(() => {
        getProducts(productFilter).then((response) => response.json())
            .then((res) => {
                setProducts(res)

            })

    }, [productFilter])
    useEffect(() => {
        countProductByFilter(productFilter).then((response) => response.json())
            .then((res) => {
                setTotalPage(res)
            })

    }, [])

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setProductFilter({ ...productFilter, page: page })

    }
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {

        setProductFilter({ ...productFilter, size: Number(event.target.value), page: 1 })

    };


    return (
        <>
            <Antd.Typography.Title>Danh sách sản phẩm</Antd.Typography.Title>

            <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={1}>
                    <Antd.Input  >

                    </Antd.Input>
                </Mui.Grid>
                <Mui.Grid item xs={5}>
                    <Antd.Input 
                    placeholder='Nhập tên hoặc mã sản phẩm' 
                    onChange={(e)=>{
                        setProductFilter({...productFilter,key:e.target.value.toString()})
                    }}
                    >

                    </Antd.Input>
                </Mui.Grid>
            </Mui.Grid>

            <Antd.Table dataSource={products}
                scroll={{ x: 500, y: 500 }}
                columns={ProductCol}
                rowKey="id" bordered
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: event => navigate({ pathname: `/supplier/details/${record.id}` }),
                    }
                }}

            />

            <Mui.TablePagination
                rowsPerPageOptions={[10, 25, 50, 100, 200]}
                count={totalPage}
                rowsPerPage={productFilter.size}
                page={productFilter.page}
                labelRowsPerPage='Row'
                labelDisplayedRows={() => {
                    return (
                        <>
                            <Antd.InputNumber style={{ marginTop: 15 }} value={productFilter.page} ></Antd.InputNumber> /{Math.ceil(totalPage / productFilter.size)}
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

export default ListProduct