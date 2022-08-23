import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// import { Mui.Chip, Autocomplete, Stack, Mui.TextField, FormControl, Box, Mui.Grid, Paper, Mui.Button, Mui.InputAdornment, styled, FormGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Input, Modal, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material'
import * as Antd from 'antd'
import { getValue } from '@mui/system';
import { AddProductInput, IVariant, OptionValue, Product, Supplier } from '../type/allType';
import { useForm } from 'react-hook-form';
import { Result, Select } from 'antd';
import addProduct from '../services/productServices';
import { FieldDataNode } from 'rc-tree';
const { Option } = Select;



function AddProduct() {
    //init values
    var initOptions: Array<Array<string>> = []

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
    }];

    const initSuppliersName: String[] = initSuppliers.map((supplier, key) =>
        supplier.name)

    const suppliersProp = {
        options: initSuppliers,
        getOptionLabel: (option: Supplier) => option.id + " | " + option.name,
    };

    const Item = Mui.styled(Mui.Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    var valuesForName: string[] = []
    var variantsAll: IVariant[] = []
    const initVariants: Array<IVariant> = []

    //state
    const [options, setOptions] = useState<string[][]>(initOptions)
    const [supplierId, setSupplierId] = useState<number>(0);
    const [variants, setVariants] = useState(initVariants)
    const [optionNumber, setOptionNumber] = useState(options.length)
    const [product,setProduct]=useState<any>([])
    const [open, setOpen] = React.useState(false);
    const [isCreated, setIsCreated] = useState(false)
    const [form]=Antd.Form.useForm()

    const children = [];

    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    useEffect(()=>{
        console.log(form.getFieldsValue())
    },[])


    //function
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }
    const handleSelectSupplier = (key: number) => {
        setSupplierId(key)
    }
    const onSubmit = (data: any) => {
        // let product: Product = data
        // product.supplierId = supplierId
        // product.accountId = 1
        // product.statusId = 1

        // let body = {
        //     product: product,
        //     variants: variants
        // }

        // addProduct(body).then(response => {

        //     return response.json()
        // }).then(result => {
        //     console.log(result)
        //     setIsCreated(true)
        // })
        console.log(data);


    }
    const addNewOptionUI = () => {
        if (options.length < 4) {
            setOptions(options.concat([[]]))

        }

    }

    const createVariants = (options: Array<Array<string>>, i: number, n: number) => {

        if (i < n) {
            let values = options[i]
            values.map((value, index) => {
                valuesForName.push(value)
                if (valuesForName.length == n) {


                    variantsAll.push({
                        id: null,
                        code: null,
                        productId: null,
                        name: valuesForName.join('-'),
                        image: null,
                        wholesalePrice: 0,
                        salePrice: 0,
                        importPrice: 0
                    })


                }
                createVariants(options, i + 1, n)
                valuesForName.pop()

            })
        }


    }

    const deleteOption = (key: number) => {

        options.splice(key, 1)
        setOptionNumber(key)

    }

    const onOptionChange = () => {

        createVariants(options, 0, options.length)
        setVariants(variantsAll)

    }


    // Component
    const ProductInfo = () => {

        return (
            <>
                <Mui.Paper sx={{ p: 5 }}>


                    <Antd.Form.Item label='Nhà cung cấp' name={'supplierId'} labelCol={{ span: 24 }}>
                        <SelectSupplier ></SelectSupplier>

                    </Antd.Form.Item>
                    <Antd.Form onFinish={onSubmit}  onFieldsChange={(dataChange)=>{setProduct(dataChange)}} 
                    >

                        <Antd.Form.Item labelCol={{ span: 24 }} labelAlign='left' label='Tên sản phẩm' name="name"
                            rules={[
                                { required: true, message: 'Tên sản phẩm không được để trống' }

                            ]}
                        >
                            <Antd.Input ></Antd.Input>
                        </Antd.Form.Item>
                        <Antd.Space size={[50, 3]}>
                            <Antd.Form.Item labelCol={{ span: 24 }} label='Giá bán lẻ' name="salePrice" style={{ width: '100%' }}
                                rules={[
                                    { required: true, message: 'Giá bán lẻ Không được để trống' },
                                ]}
                            >
                                <Antd.InputNumber defaultValue={0} min={0} style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                >
                                </Antd.InputNumber>
                            </Antd.Form.Item>
                            <Antd.Form.Item labelCol={{ span: 24 }} label='Giá bán buôn' name="wholesalePrice" >
                                <Antd.InputNumber defaultValue={0} min={0} style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                >
                                </Antd.InputNumber>
                            </Antd.Form.Item>
                            <Antd.Form.Item labelCol={{ span: 24 }} label='Giá nhập' name="importPrice"
                                rules={[
                                    { required: true, message: 'Giá nhập không được để trống' },

                                ]}
                            >
                                <Antd.InputNumber defaultValue={0} min={0} style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                >
                                </Antd.InputNumber>
                            </Antd.Form.Item>

                        </Antd.Space>
                        <Antd.Form.Item name='description'>
                            <Antd.Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />

                        </Antd.Form.Item>
                        <Mui.Button sx={{ ml: 100 }} variant="contained" type='submit'>Lưu</Mui.Button>

                    </Antd.Form>
                </Mui.Paper>

            </>
        )
    }
    const SelectSupplier = () => {
        return (
            <>
                <Antd.Select style={{ width: '100%', marginBottom: 10 }} dropdownStyle={{ height: 300, width: 700 }}
                    showSearch
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    defaultValue={0}
                    onChange={handleSelectSupplier}
                    filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA!.children as unknown as string)
                            .toLowerCase()
                            .localeCompare((optionB!.children as unknown as string).toLowerCase())
                    }

                >
                    {
                        initSuppliers.map((supplier, index) => {
                            return (
                                <Antd.Select.Option style={{ width: 1000, marginTop: 5 }} key={index} value={index}>

                                    {supplier.name + " | " + supplier.code}

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
                <Mui.Paper style={{ boxSizing: 'border-box', height: 400, padding:'3% 10%' }} >

                    {
                        options.map
                            ((value, index) => {
                                return (

                                    // <Mui.Grid style={{ boxSizing: 'border-box' }} container spacing={2} mb={5} ml={1}>
                                    //     <Mui.Grid item xs={3}>
                                    //         <Mui.TextField
                                    //             variant="outlined"
                                    //             label="Tên thuộc tính"
                                    //             size='small'
                                    //             InputProps={{
                                    //                 startAdornment: (
                                    //                     <Mui.InputAdornment position="start">
                                    //                     </Mui.InputAdornment>
                                    //                 ),
                                    //             }}
                                    //         />
                                    //     </Mui.Grid>
                                    //     <Mui.Grid item xs={6}>
                                    //         <Mui.Autocomplete
                                    //             multiple
                                    //             id="options"
                                    //             options={value}
                                    //             size='small'
                                    //             freeSolo
                                    //             renderTags={(value: string[], getTagProps) => {
                                    //                 options[index] = value
                                    //                 return value.map((option: string, index: number) => {
                                    //                     return (
                                    //                         <Mui.Chip sx={{ p: 0, m: 0 }} variant="outlined" label={option} {...getTagProps({ index })} />
                                    //                     )
                                    //                 }
                                    //                 )
                                    //             }
                                    //             }
                                    //             renderInput={(params) => (
                                    //                 <Mui.TextField
                                    //                     {...params}
                                    //                     variant="outlined"

                                    //                     label="Giá trị"
                                    //                     placeholder=""
                                    //                 />
                                    //             )}

                                    //         />

                                    //     </Mui.Grid>
                                    //     <Mui.Grid item xs={2} >
                                    //         {index === options.length - 1 ? <Mui.Button onClick={() => deleteOption(index)} >Delete</Mui.Button> : null}

                                    //     </Mui.Grid>
                                    // </Mui.Grid>
                                    <>
                                    <Antd.Input   style={{
                                           width: '20%',
                                           margin:'10px 10px'
                                       }}></Antd.Input>
                                       <Antd.Select
                                       
                                       mode="tags"
                                       placeholder="Please select"
                                       style={{
                                           width: '60%',
                                       }}
                                       defaultValue={[...value]}
                                       onChange={(data)=>{
                                          options[index]=data
                                          console.log(options)
                                        //   onOptionChange()
                                       }}
                                   >
                                                               
                                   </Antd.Select>
                                     {index === options.length - 1 ? <Mui.Button onClick={() => deleteOption(index)} >Delete</Mui.Button> : null}
                                     </>

                                   
                                )
                            })}
                    <Mui.Button sx={{ ml: 3 }} onClick={addNewOptionUI}>Thêm Thuộc tính</Mui.Button>
                    <Mui.Button sx={{ ml: 6 }} onClick={() => { onOptionChange() }}>Tạo các phiên bản</Mui.Button>


                </Mui.Paper>
            </>
        )
    }

    return (
        <div>
            <Mui.Modal sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                p: 4,

            }}
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Mui.Paper sx={{ top: '40%', left: '40%', height: '20%', width: '20%' }}>
                    {isCreated ? "Thêm thành công" : <Mui.CircularProgress />}
                </Mui.Paper>
            </Mui.Modal>
            <span>Thông tin chung </span>

            <Mui.Box sx={{ flexGrow: 1 }}>
                <Mui.Grid container spacing={2}>
                    <Mui.Grid item xs={7} textAlign={'left'} >
                        <ProductInfo></ProductInfo>
                    </Mui.Grid>
                    <Mui.Grid item xs={5}  >
                        <OptionInfo></OptionInfo>
                     
                    </Mui.Grid>

                </Mui.Grid>
            </Mui.Box>

            <Mui.TableContainer sx={{ mt: 5 }} component={Mui.Paper}>
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
                                    <Mui.TextField
                                        size='small'
                                        type="number"
                                        onChange={(e) => {
                                            variant.salePrice = Number(e.target.value)
                                        }} />
                                </Mui.TableCell>
                                <Mui.TableCell align="center">
                                    <Mui.TextField
                                        size='small'
                                        type="number"
                                        onChange={(e) => {
                                            variant.wholesalePrice = Number(e.target.value)
                                        }} />
                                </Mui.TableCell>
                                <Mui.TableCell align="center">
                                    <Mui.TextField
                                        size='small'
                                        type="number"
                                        onChange={(e) => {
                                            if (Number(e.target.value) > 0) {
                                                variant.importPrice = Number(e.target.value)

                                            }
                                        }} />

                                </Mui.TableCell>
                            </Mui.TableRow>
                        ))}
                    </Mui.TableBody>
                </Mui.Table>
            </Mui.TableContainer>
        </div>



    )




}



export default AddProduct;
