import { Navigate, useNavigate } from 'react-router-dom';


import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material'
import * as Antd from 'antd'
import { AddProductInput, IVariant, OptionValue, Product, Supplier } from '../../type/allType';
import { addProduct } from '../../services/productServices';
import { getSuppliers } from '../../services/api';
import { ISupplier } from '../../services/customType';
import ToastCustom from '../../features/toast/Toast';



function AddProduct() {
    //init values
    interface OX {
        name: string,
        values: Array<string>
    }
    var initOptions: Array<OX> = []

    const initSuppliers: Supplier[] = [{
        id: 1,
        code: "string",
        name: "name1",
        email: "string",
        phone: "string",
        address: "string",
        accountId: 1,
        createAt: "string",
        updateAt: "string",
        isDelete: true
    },
    {
        id: 2,
        code: "string",
        name: "name2",
        email: "string",
        phone: "string",
        address: "string",
        accountId: 1,
        createAt: "string",
        updateAt: "string",
        isDelete: true
    },
    {
        id: 3,
        code: "string",
        name: "name3",
        email: "string",
        phone: "string",
        address: "string",
        accountId: 1,
        createAt: "string",
        updateAt: "string",
        isDelete: true
    },];
    var valuesForName: string[] = []
    var variantsAll: IVariant[] = []
    const initVariants: Array<IVariant> = []
    let getProduct = localStorage.getItem("product")
    const initProduct: AddProductInput = getProduct ? JSON.parse(getProduct) : {
        code: '',
        productId: 0,
        name: '',
        description: '',
        wholesalePrice: 0,
        salePrice: 0,
        importPrice: 0


    }
    //state
    const [options, setOptions] = useState<Array<OX>>(initOptions)
    const [supplierId, setSupplierId] = useState<number>();
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

    const [variants, setVariants] = useState(initVariants)
    const [product, setProduct] = useState<AddProductInput>(initProduct)
    const [open, setOpen] = React.useState(false);
    const [isCreated, setIsCreated] = useState(false)
    const navigate=useNavigate()
    //function
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }
    const handleSelectSupplier = (key: number) => {
        setSupplierId(key)
    }
    const onSubmit = (data: any) => {
        let { salePrice, wholesalePrice, importPrice, ...other } = { ...product }
        let newProduct = { ...other, supplierId: supplierId, accountId: 1, statusId: 1 }

        let body = {
            product: newProduct,
            variants: variants
        }

        if (options.length == 0) {
            body = {
                ...body,
                variants: [{ name: newProduct.name, salePrice, importPrice, wholesalePrice }]
            }
        }
        else {
            body = {
                ...body,
                variants: variants
            }
        }
        handleOpen()

        addProduct(body).then(response => {

            return response.json()
        }).then(result => {
            console.log(result)
            localStorage.removeItem('product')
            navigate('/products')
            handleClose()
            ToastCustom.fire({
                icon: 'success',
                title: 'Thêm sản phẩm thành công'
            }).then()
        }).catch((erorr) => {
            ToastCustom.fire({
                icon: 'error',
                title: 'Thêm sản phẩm thất bại'
            }).then()
            handleClose()
        })

    }
    const addNewOptionUI = () => {
        if (options.length < 4) {

            setOptions(options.concat([{
                name: '',
                values: []
            }]))

        }

    }

    const createVariants = (options: Array<OX>, i: number, n: number) => {

        if (i < n) {
            let values = options[i].values
            values.map((value, index) => {
                valuesForName.push(value)
                if (valuesForName.length == n) {


                    variantsAll.push({
                        id: null,
                        code: null,
                        productId: null,
                        name: product.name + '-' + valuesForName.join('-'),
                        image: null,
                        wholesalePrice: product.wholesalePrice,
                        salePrice: product.salePrice,
                        importPrice: product.importPrice
                    })


                }
                createVariants(options, i + 1, n)
                valuesForName.pop()

            })
        }


    }

    const deleteOption = (key: number) => {

        options.splice(key, 1)
        onOptionChange()
    }

    const onOptionChange = () => {

        createVariants(options, 0, options.length)
        setVariants(variantsAll)

    }
    useEffect(() => {
        let x = localStorage.getItem('product')
        let y = x ? JSON.parse(x) : initProduct
        setProduct(y)
    }, [supplierId, options])

    useEffect(()=>{
        getSuppliers().then((r) => {
            setSuppliers(r.data.reverse())
        })
    },[])

    // Component
    const ProductInfo = () => {

        return (
            <>
                <h1>Thông tin chung</h1>    
                <Mui.Paper sx={{ p: 5, height: 645 }}>
                    <Antd.Form onFinish={onSubmit}

                        initialValues={product}
                        onValuesChange={(change, value) => {
                            localStorage.setItem('product', JSON.stringify(value))
                        }}
                    >
                        <Antd.Form.Item label='Nhà cung cấp' name={'supplierId'} labelCol={{ span: 24 }}>
                            <SelectSupplier ></SelectSupplier>

                        </Antd.Form.Item>
                        <Antd.Form.Item labelCol={{ span: 24 }} labelAlign='left' label='Tên sản phẩm' name="name"
                            rules={[
                                { required: true, message: 'Tên sản phẩm không được để trống' }

                            ]}
                        >
                            <Antd.Input size={'large'}    ></Antd.Input>
                        </Antd.Form.Item>
                        <Antd.Space size={[50, 3]}>
                            <Antd.Form.Item labelCol={{ span: 24 }} label='Giá bán lẻ' name="salePrice" style={{ width: '100%' }}
                                rules={[
                                    { required: true, message: 'Giá bán lẻ Không được để trống' },
                                ]}
                            >
                                <Antd.InputNumber size={'large'} min={0} style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                >
                                </Antd.InputNumber>
                            </Antd.Form.Item>
                            <Antd.Form.Item labelCol={{ span: 24 }} label='Giá bán buôn' name="wholesalePrice" >
                                <Antd.InputNumber size={'large'} min={0} style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                >
                                </Antd.InputNumber>
                            </Antd.Form.Item>
                            <Antd.Form.Item labelCol={{ span: 24 }} label='Giá nhập' name="importPrice"
                                rules={[
                                    { required: true, message: 'Giá nhập không được để trống' },

                                ]}
                            >
                                <Antd.InputNumber size={'large'} min={0} style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                >
                                </Antd.InputNumber>
                            </Antd.Form.Item>

                        </Antd.Space>
                        <Antd.Form.Item name='description' >
                            <Antd.Input.TextArea rows={8} placeholder="Mô tả sản phẩm" />

                        </Antd.Form.Item>
                        <Mui.Button sx={{ left: '93%', top: '93%', position: 'fixed', zIndex: 10, p: '10px 30px', m: '10px 10px' }} variant="contained" type='submit'>Lưu</Mui.Button>

                    </Antd.Form>
                </Mui.Paper>

            </>
        )
    }
    const SelectSupplier = () => {
        return (
            <>
                <Antd.Select style={{ width: '100%', marginBottom: 10, borderRadius: 5 }} size={'large'}
                    showSearch
                    placeholder="Nhấn để chọn nhà cung cấp"
                    optionFilterProp="children"
                    defaultValue={supplierId}
                    onChange={handleSelectSupplier}
                    filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA!.children as unknown as string)
                            .toLowerCase()
                            .localeCompare((optionB!.children as unknown as string).toLowerCase())
                    }

                >
                    {
                        suppliers.map((supplier, index) => {
                            return (
                                <Antd.Select.Option key={supplier.id} value={supplier.id}>

                                    {supplier.code+' | '+supplier.name}

                                </Antd.Select.Option>
                            )
                        })
                    }
                </Antd.Select>
            </>
        )
    }
    const OptionInfo = () => {
        return (
            <>
                <h1>Thêm thuộc tính</h1>
                <Mui.Paper style={{ boxSizing: 'border-box', height: 300, padding: '3% 10%' }} >

                    {
                        options.map
                            ((option, index) => {
                                return (
                                    <>
                                        <Antd.Input size={'large'} style={{
                                            width: '20%',
                                            margin: '10px 10px',
                                            borderRadius: 5

                                        }}
                                            onChange={(data) => {
                                                let { name, values } = { ...option }
                                                options[index].name = data.target.value.toString()
                                            }}
                                        ></Antd.Input>
                                        <Antd.Select
                                            size={'large'}
                                            mode="tags"
                                            placeholder="Please select"
                                            style={{
                                                width: '60%',
                                            }}
                                            defaultValue={[...option.values]}
                                            onChange={(values) => {
                                                options[index].values = values
                                            }}
                                            onBlur={() => {
                                                onOptionChange()

                                            }}
                                        >

                                        </Antd.Select>
                                        {index === options.length - 1 ? <Mui.Button onClick={() => deleteOption(index)} >Delete</Mui.Button> : null}
                                    </>


                                )
                            })}
                    <Mui.Button sx={{ ml: 3 }} onClick={addNewOptionUI}>+ Thêm Thuộc tính</Mui.Button>
                    {/* <Mui.Button sx={{ ml: 6 }} onClick={() => { onOptionChange() }}>Tạo các phiên bản</Mui.Button> */}


                </Mui.Paper>
            </>
        )
    }
    const SelectCategory = () => {
        return (
            <>
                <h1>Chọn Danh mục </h1>

                <Mui.Paper style={{ boxSizing: 'border-box', height: 300, padding: '3% 10%', marginBottom:10 }}>

                </Mui.Paper>
            </>

        )
    }
    const Variants = () => {
        return (
            <>
                <h1>Các phiên bản</h1>
                <Mui.TableContainer  component={Mui.Paper}>
                    <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <Mui.TableHead>
                            <Mui.TableRow>
                                <Mui.TableCell align="center">Tên sản phẩm</Mui.TableCell>
                                <Mui.TableCell align="center">Giá bán lẻ</Mui.TableCell>
                                <Mui.TableCell align="center">Giá bán buôn</Mui.TableCell>
                                <Mui.TableCell align="center">Giá nhập</Mui.TableCell>
                            </Mui.TableRow>
                        </Mui.TableHead>
                        <Mui.TableBody>
                            {variants.map((variant, index) => (
                                <Mui.TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <Mui.TableCell component="th" scope="row" align="center">
                                        {variant.name}
                                    </Mui.TableCell>
                                    <Mui.TableCell align="center">
                                        <Antd.InputNumber
                                            defaultValue={variant.salePrice}
                                            size='middle'
                                            style={{ width: '70%' }}
                                            min={0}
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            onChange={(e) => {
                                                variant.salePrice = Number(e)

                                            }} />
                                    </Mui.TableCell>
                                    <Mui.TableCell align="center">
                                        <Antd.InputNumber
                                            defaultValue={variant.wholesalePrice}
                                            size='middle'
                                            style={{ width: '70%' }}
                                            min={0}
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            onChange={(e) => {
                                                variant.wholesalePrice = Number(e)

                                            }} />
                                    </Mui.TableCell>
                                    <Mui.TableCell align="center">
                                        <Antd.InputNumber
                                            defaultValue={variant.importPrice}
                                            size='middle'
                                            style={{ width: '70%' }}
                                            min={0}
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            onChange={(e) => {
                                                variant.importPrice = Number(e)

                                            }} />

                                    </Mui.TableCell>
                                </Mui.TableRow>
                            ))}
                        </Mui.TableBody>
                    </Mui.Table>
                </Mui.TableContainer>
            </>
        )
    }

    return (
        <div>
            <h1 style={{ fontSize: 30 }}>Thêm sản phẩm mới</h1>

            <Mui.Modal sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                p: 4,
            }}
                open={open}

            >
                <Mui.Paper sx={{ margin: '300px', p: '100px 100px 100px 100px' }}>
                    {isCreated ? "Thêm thành công" : <Mui.CircularProgress />}
                </Mui.Paper>
            </Mui.Modal>
            <Mui.Box sx={{ flexGrow: 1 , mb:5 }}  >
                <Mui.Grid container spacing={2}>
                    <Mui.Grid item xs={7} textAlign={'left'} >
                        <ProductInfo></ProductInfo>
                    </Mui.Grid>
                    <Mui.Grid item xs={5}  >
                        <SelectCategory></SelectCategory>
                        <OptionInfo></OptionInfo>

                    </Mui.Grid>

                </Mui.Grid>
            </Mui.Box>

            <Variants></Variants>
        </div>



    )




}



export default AddProduct;
