import { Link, useNavigate } from 'react-router-dom';

import {LeftOutlined}  from "@ant-design/icons";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as Mui from '@mui/material'
import * as Antd from 'antd'
import { AddProductInput, IVariant} from '../../type/allType';
import { addProduct } from '../../services/productServices';
import { getSuppliers } from '../../services/api';
import { ISupplier } from '../../services/customType';
import ToastCustom from '../../features/toast/Toast';
import { Delete } from '@mui/icons-material';
import { RcFile } from 'antd/lib/upload';
import ImageUpload from './ImageUpload';


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });


function AddProduct() {
    //init values
    interface OX {
        name: string,
        values: Array<string>
    }
    var initOptions: Array<OX> = []


    var valuesForName: string[] = []
    var variantsAll: IVariant[] = []
    const initVariants: Array<IVariant> = []
    let getProduct = localStorage.getItem("product")
    var initProduct: AddProductInput = getProduct ? JSON.parse(getProduct) : {
        code: '',
        productId: 0,
        name: '',
        description: '',
        wholesalePrice: 0,
        salePrice: 0,
        importPrice: 0,


    }
    //state
    const [options, setOptions] = useState<Array<OX>>(initOptions)
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

    const [variants, setVariants] = useState(initVariants)
    const [product, setProduct] = useState<AddProductInput>(initProduct)
    const [open, setOpen] = React.useState(false);
    const [isCreated, setIsCreated] = useState(false)
    // const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const navigate = useNavigate()
    //function
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }

    const onSubmit = (data: AddProductInput) => {
        console.log(data)
        let { salePrice, wholesalePrice, importPrice, ...other } = { ...data }
        let newProduct = { ...other, accountId: 1, statusId: 1 }

        let body = {
            product: newProduct,
            variants: variants
        }

        // eslint-disable-next-line eqeqeq
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
            if (response.ok) {
                localStorage.removeItem('product')
                ToastCustom.fire({
                    icon: 'success',
                    title: 'Thêm sản phẩm thành công'
                }).then()
                localStorage.removeItem('products')
                navigate('/products')
            }
            else {
                ToastCustom.fire({
                    icon: 'error',
                    title: 'Thêm sản phẩm thất bại'
                }).then()
            }


            handleClose()


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
    useLayoutEffect(() => {
        let x = localStorage.getItem('product')
        let y = x ? JSON.parse(x) : initProduct
        setProduct(y)
    }, [options])

    useEffect(() => {
        getSuppliers().then((r) => {
            setSuppliers(r.data.reverse())
        })
    }, [])

    // Component
    const ProductInfo = () => {

        return (
            <>
                <Mui.Paper sx={{ px: 5, py: 2, height: 565 }}>
                    <h1>Thông tin chung</h1>

                    {/* <SelectSupplier ></SelectSupplier> */}

                    <Antd.Form.Item style={{ marginTop: 50 }} labelCol={{ span: 24 }} labelAlign='left' label='Tên sản phẩm' name="name"
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


                </Mui.Paper>

            </>
        )
    }
    const SelectSupplier = () => {
        return (
            <>
                <Antd.Form.Item name={'supplierId'} label={'Nhà cung cấp'} labelCol={{ span: 24 }}
                    rules={[
                        { required: true, message: 'Không được để trống nhà cung cấp' }

                    ]}>
                    <Antd.Select style={{ width: '100%', marginBottom: 10, borderRadius: 5 }} size={'large'}
                        showSearch
                        placeholder="Nhấn để chọn nhà cung cấp"
                        optionFilterProp="children"
                        defaultValue={null}
                        // onChange={handleSelectSupplier}
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

                                        {supplier.code + ' | ' + supplier.name}

                                    </Antd.Select.Option>
                                )
                            })
                        }
                    </Antd.Select>
                </Antd.Form.Item>

            </>
        )
    }
    const OptionInfo = () => {
        return (
            <>
                <Mui.Paper sx={{ px: 5, py: 2, height: 300 }} >
                    <h1>Thêm thuộc tính</h1>

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
                                            defaultValue={option.name}
                                            onChange={(data) => {
                                                let { name, values } = { ...option }
                                                options[index].name = data.target.value.toString()
                                            }}
                                        ></Antd.Input>


                                        <Antd.Select key={index}
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
                                        {index === options.length - 1 ? <Mui.Button onClick={() => deleteOption(index)} endIcon={<Delete />} color={'error'} ></Mui.Button> : null}
                                    </>


                                )
                            })}
                    {options.length < 4 ? <Mui.Button sx={{ ml: 3 }} onClick={addNewOptionUI}>+ Thêm Thuộc tính</Mui.Button> : null
                    }                    {/* <Mui.Button sx={{ ml: 6 }} onClick={() => { onOptionChange() }}>Tạo các phiên bản</Mui.Button> */}


                </Mui.Paper>
            </>
        )
    }
    const ImageSelect = () => {

        return (
            <Mui.Paper sx={{ px: 5, py: 2, height: 250, mb: 2 }}>
                <h1>Thêm hình ảnh </h1>
                <div style={{ margin:'20px 50px'}}>
                    {/* <Antd.Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"

                    >      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : UploadButton}

                    </Antd.Upload> */}
                           <ImageUpload/>
                </div>

            </Mui.Paper>
     
        )

    }
    const SelectCategory = () => {
        return (
            <>

                <Mui.Paper sx={{ px: 5, py: 2, height: 250, mb: 2 }}>
                    <h1>Chọn Danh mục </h1>
                    <Antd.Select
                    style={{ width: '100%', marginTop:'40px',marginBottom: 10, borderRadius: 5 }} size={'large'}
                    showSearch
                    placeholder="Nhấn để chọn "
                    optionFilterProp="children"
                    defaultValue={null}
                    
                    >

                    </Antd.Select>
                </Mui.Paper>
            </>

        )
    }
    const Variants = () => {
        return (
            <>
                <h1>Các phiên bản</h1>
                <Mui.TableContainer component={Mui.Paper} sx={{ maxHeight: 500, overflow: 'hiden' }} >
                    <Mui.Table aria-label="simple table" stickyHeader
                    >
                        <Mui.TableHead >
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
    const UploadButton = (
        <div>
            <div style={{ marginTop: 10 }}>Upload</div>
        </div>
    );

    return (
        <div>
            <h2 style={{margin:20}}>
                           <Link to="/products">
                               <LeftOutlined /> Danh sách sản phẩm
                            </Link>
                       </h2>
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
            <Antd.Form onFinish={onSubmit}

                initialValues={product}
                onValuesChange={(change, value) => {
                    localStorage.setItem('product', JSON.stringify(value))
                }}
            >
                <Mui.Box sx={{ flexGrow: 1, mb: 5 }}  >
                    <Mui.Grid container spacing={2}>
                        <Mui.Grid item xs={7} textAlign={'left'} >
                            <ProductInfo></ProductInfo>
                        </Mui.Grid>
                        <Mui.Grid item xs={5}  >
                            <Mui.Grid container spacing={2}>
                                <Mui.Grid item xs={6}>
                                    <ImageSelect />
                                </Mui.Grid>
                                <Mui.Grid item xs={6}>
                                    <SelectCategory></SelectCategory>

                                </Mui.Grid>

                            </Mui.Grid>
                            <OptionInfo></OptionInfo>

                        </Mui.Grid>

                    </Mui.Grid>
                </Mui.Box>

                {options[0]?.values.length > 0 ? <Variants /> : null}

<div style={{display:'flex',justifyContent:'flex-end' }}>
<Antd.Button type='primary' htmlType='submit' style={{ margin: '20px 0px', width: 150 }}>Lưu</Antd.Button>


</div>
              
            </Antd.Form>

        </div >



    )




}



export default AddProduct;
