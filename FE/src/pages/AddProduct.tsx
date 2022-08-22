import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { Chip, Autocomplete, Stack, TextField, FormControl, Theme, InputLabel, FormHelperText, Box, Grid, Paper, TextareaAutosize, ButtonBase, Button, InputAdornment, styled, FormGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getValue } from '@mui/system';
import { AddProductInput, Option, OptionValue, Product, Supplier } from '../type/allType';
import { useForm } from 'react-hook-form';
import { idText } from 'typescript';

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

function AddProduct() {
    var initOptions: Array<Array<string>> = []

    const [options, setOptions] = useState<string[][]>(initOptions)
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<AddProductInput>()
    const [optionNumber, setOptionNumber] = useState(options.length)
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const onSubmit = (data: any) => {
        let product: Product = data

        console.log(options)



    }
    const addNewOptionUI = () => {
        setOptions(options.concat([[]]))
        initOptions.concat([[]])

    }



    const deleteOption = (key: number) => {

        options.splice(key, 1)
        setOptionNumber(key)

    }

    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={7} textAlign={'left'} >

                        <Paper sx={{ p: 2 }}>

                            <span>Thông tin chung </span>
                            <Autocomplete

                                {...suppliersProp}
                                sx={{ mt: 3 }}
                                id="disable-close-on-select"
                                clearOnEscape
                                renderInput={(params) => (
                                    <TextField   {...params} label="Nhà cung cấp" variant="outlined" />
                                )}
                                onChange={(event: any, newValue: Supplier | null) => {
                                    setSupplier(newValue);
                                }}
                            />
                        </Paper>


                        <FormControl sx={{ mt: 10, flexFlow:1 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <Item sx={{p:2}}>
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

                                <Button variant="contained" onClick={handleSubmit(onSubmit)} >Lưu</Button>
                            </form>


                        </FormControl>




                    </Grid>
                    <Grid item xs={5} >
                        <Paper >

                            {
                                options.map
                                    ((value, index) => {
                                        return (
                                            <Grid container spacing={2} mb={5} ml={1}>
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
                                                        renderTags={(value: string[] | any, getTagProps) => {
                                                            options[index] = value
                                                            return value.map((option: string, index: number) => {
                                                                return (
                                                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
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
                                                    <Button onClick={() => {
                                                        deleteOption(index)
                                                    }} >Delete</Button>

                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                            <Button sx={{ ml: 3, mt: 3 }} onClick={addNewOptionUI}>Thêm Thuộc tính</Button>


                        </Paper>


                    </Grid>

                </Grid>
            </Box>

        </>



    )




}



export default AddProduct;
