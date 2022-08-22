import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { Chip, Autocomplete, Stack, TextField, FormControl, Box, Grid, Paper, Button, InputAdornment, styled, FormGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Input, Modal, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getValue } from '@mui/system';
import { AddProductInput, IVariant, OptionValue, Product, Supplier } from '../type/allType';
import { useForm } from 'react-hook-form';
import { Result, Select } from 'antd';
import addProduct from '../services/productServices';
const { Option } = Select;



function AddProduct() {
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
    var valuesForName: string[] = []
    var variantsAll: IVariant[] = []
    const initVariants: Array<IVariant> = []
    const [options, setOptions] = useState<string[][]>(initOptions)
    const [supplierId, setSupplierId] = useState<number>(0);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<AddProductInput>()
    const [variants, setVariants] = useState(initVariants)
    const [optionNumber, setOptionNumber] = useState(options.length)
    const [open, setOpen] = React.useState(false);
    const [isCreated, setIsCreated] = useState(false)
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleSelectSupplier = (key: number) => {
        setSupplierId(key)
    }
    const onSubmit = (data: any) => {
        let product: Product = data
        product.supplierId = supplierId
        product.accountId = 1
        product.statusId = 1

        let body = {
            product: product,
            variants: variants
        }
       
        addProduct(body).then(response => {
            
            return response.json()
        }).then(result=>{
            console.log(result)
            setIsCreated(true)
        })
     

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
    // useEffect(()=>{

    //         console.log(variants)
    // },[options])

    const deleteOption = (key: number) => {

        options.splice(key, 1)
        setOptionNumber(key)

    }

    const onOptionChange = () => {

        createVariants(options, 0, options.length)
        setVariants(variantsAll)

    }


    return (
        <div>
            <Modal sx={{
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
                <Paper sx={{ top: '40%', left: '40%', height: '20%', width: '20%' }}>
                    {isCreated ? "Thêm thành công" : <CircularProgress />}
                </Paper>
            </Modal>
            <span>Thông tin chung </span>
            <Button variant="contained" onClick={handleSubmit(onSubmit)} >Lưu</Button>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={7} textAlign={'left'} >



                        {/* <Autocomplete
                            options={initSuppliers}
                            getOptionLabel={(option: Supplier) => option.name}
                            sx={{ mt: 3 }}
                            id="supplier"
                            disableCloseOnSelect
                            renderInput={(params) => (
                                <TextField   {...params} label="Nhà cung cấp" variant="outlined" />
                            )}
                            onChange={(event: any, newValue: Supplier | null) => {
                                setSupplier(newValue);
                                console.log(supplier)
                            }}
                        /> */}
                        <Select style={{ width: '100%' }} dropdownStyle={{ height: 300, width: 700 }}

                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            onChange={handleSelectSupplier}
                            filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                    .toLowerCase()
                                    .localeCompare((optionB!.children as unknown as string).toLowerCase())
                            }
                            onSelect={() => {

                            }}
                        >
                            {
                                initSuppliers.map((supplier, index) => {
                                    return (
                                        <Option style={{ width: 1000 }} value={supplier.id}>

                                            {supplier.name + "  " + supplier.code}

                                        </Option>
                                    )
                                })
                            }
                        </Select>


                        <FormControl sx={{ mt: 5, flexFlow: 1 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <Item sx={{height:325}}>
                                    <TextField
                                        label="Tên sản phẩm"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ width: 600, mt: 5 }}
                                        id="name"
                                        defaultValue=""
                                        size="small"
                                        autoFocus={errors.name ? true : false}
                                        variant='outlined'
                                        {...register('name', { required: 'Tên sản phẩm không được để trống', minLength: 3 })}
                                        helperText={errors.name ? errors.name.message : null}
                                        error={!!errors.name}

                                    />

                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                </InputAdornment>
                                            ),
                                        }}
                                        label="Mô tả"
                                        sx={{ width: 600, mt: 5, height: 150 }}
                                        id="description"
                                        maxRows={5}
                                        {...register('description')}
                                        defaultValue=""
                                        variant='outlined'

                                        size="small"
                                        helperText={errors.description ? errors.description.message : null}
                                        error={!!errors.description}
                                    />


                                    {/* <TextareaAutosize
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="Mô tả"
                                defaultValue="Ví dụ"
                                style={{ width: 600 , height:150 ,marginTop:10}}
                            /> */}
                                </Item>

                            </form>


                        </FormControl>




                    </Grid>
                    <Grid item xs={5} >
                        <Paper style={{ boxSizing: 'border-box', height: 400, marginTop: 15 }} >

                            {
                                options.map
                                    ((value, index) => {
                                        return (
                                            <Grid style={{ boxSizing: 'border-box' }} container spacing={2} mb={5} ml={1}>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        variant="outlined"
                                                        label="Tên thuộc tính"
                                                        size='small'
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Autocomplete
                                                        multiple
                                                        id="tags-filled"
                                                        options={value}
                                                        size='small'
                                                        freeSolo
                                                        renderTags={(value: string[], getTagProps) => {
                                                            options[index] = value
                                                            return value.map((option: string, index: number) => {
                                                                return (
                                                                    <Chip sx={{ p: 0, m: 0 }} variant="outlined" label={option} {...getTagProps({ index })} />
                                                                )
                                                            }
                                                            )
                                                        }
                                                        }
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"

                                                                label="Giá trị"
                                                                placeholder=""
                                                            />
                                                        )}

                                                    />

                                                </Grid>
                                                <Grid item xs={2} >
                                                    {index === options.length - 1 ? <Button onClick={() => deleteOption(index)} >Delete</Button> : null}

                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                            <Button sx={{ ml: 3  }} onClick={addNewOptionUI}>Thêm Thuộc tính</Button>
                            <Button sx={{ ml: 6 }} onClick={() => { onOptionChange() }}>Tạo các phiên bản</Button>


                        </Paper>


                    </Grid>

                </Grid>
            </Box>

            <TableContainer sx={{mt:5}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Tên sản phẩm</TableCell>
                            <TableCell align="center">Giá bán lẻ</TableCell>
                            <TableCell align="center">Giá bán buôn</TableCell>
                            <TableCell align="center">Giá nhập</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {variants.map((variant, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {variant.name}
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size='small'
                                        type="number"
                                        onChange={(e) => {
                                            variant.salePrice = Number(e.target.value)
                                        }} />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size='small'
                                        type="number"
                                        onChange={(e) => {
                                            variant.wholesalePrice = Number(e.target.value)
                                        }} />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size='small'
                                        type="number"
                                        onChange={(e) => {
                                            if (Number(e.target.value) > 0) {
                                                variant.importPrice = Number(e.target.value)

                                            }
                                        }} />

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>



    )




}



export default AddProduct;
