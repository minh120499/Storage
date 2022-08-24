import * as Antd from 'antd'

import * as Mui from '@mui/material'

import { Button, Dropdown, Menu, Modal, Space, Table, Typography } from "antd";
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

    const { Title } = Typography;
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
            <Title>Danh sách sản phẩm</Title>
            <Mui.Paper>
                <Mui.TableContainer sx={{ mt: 5, height:600, maxHeight: 600 }} component={Mui.Paper}>
                    <Mui.Table sx={{ minWidth: 650 }} stickyHeader aria-label="Bảng sản phẩm">
                        <Mui.TableHead  >
                            <Mui.TableRow>
                                <Mui.TableCell align="center">Mã sản phẩm</Mui.TableCell>
                                <Mui.TableCell align="center">Tên sản phẩm</Mui.TableCell>
                                <Mui.TableCell align="center">Số lượng phiên bản</Mui.TableCell>
                                <Mui.TableCell align="center">Số lượng</Mui.TableCell>

                            </Mui.TableRow>
                        </Mui.TableHead>
                        <Mui.TableBody >
                            {
                                products.map((product, index) => {

                                    return (
                                        <Mui.TableRow key={index}>
                                            <Mui.TableCell align="center">{product.code}</Mui.TableCell>
                                            <Mui.TableCell align="center">{product.name}</Mui.TableCell>
                                            <Mui.TableCell align="center">{product.numberOfVariant}</Mui.TableCell>
                                            <Mui.TableCell align="center">{product.total}</Mui.TableCell>
                                        </Mui.TableRow>


                                    )
                                })
                            }


                        </Mui.TableBody>

                        {/* <Mui.TableFooter>
                            <Mui.TableRow>

                            </Mui.TableRow>

                        </Mui.TableFooter> */}


                    </Mui.Table>
                </Mui.TableContainer>
                <Mui.TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100, 200]}
                    count={totalPage}
                    rowsPerPage={productFilter.size}
                    page={productFilter.page}
                    labelRowsPerPage='Row'
                    labelDisplayedRows={()=>{
                        return (
                           <>
                           <Antd.InputNumber style={{marginTop:15}} value={productFilter.page} ></Antd.InputNumber>
                           </>
                        )
                    }}
                    component='div'
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={ProductPagination}
                    style={{verticalAlign:"center"}}
                />

            </Mui.Paper>
            <Table dataSource={products}
                   columns={ProductCol}
                   rowKey="id" bordered
                   pagination={false}
                   onRow={(record) => {
                       return {
                           onClick: event => navigate({pathname: `/supplier/details/${record.id}`}),
                       }
                   }}

            />

        </>
    )
}

export default ListProduct