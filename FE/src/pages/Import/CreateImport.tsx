import React, {useEffect, useState} from "react";
import * as Antd from "antd";
import {Button, Col, Divider, Form, Row, Select, Space} from "antd";
import SelectSupplier from "../../components/SelectSupplier";
import {IProductVariant} from "../../services/customType";
import {getCountTotalProductVariant, getProductVariant} from "../../services/api";
import {BackwardOutlined, FastForwardOutlined} from '@ant-design/icons';

// import * as CurrencyFormat from 'react-currency-format';

const CreateImport = () =>{
    const {Option} = Select;
    const [supplierId,setSupplierId] = useState<number>();
    const [productVariants,setProductVariants] = useState([{} as IProductVariant ])

    const [totalPage,setTotalPage] = useState<number>(0)

    const [pageNumber,setPageNumber] = useState(1);

    useEffect(() =>{
        getCountTotalProductVariant().then(r => {
            setTotalPage(r.data)
        })
    },[])

    useEffect(() =>{
        getProductVariant(pageNumber).then((productVariant) =>{
            setProductVariants(productVariant.data.reverse())
        })
    },[pageNumber])

    return (
        <div>
            <h1>Tạo đơn nhập hàng</h1>
            <Row gutter={24}>
                <Col span={16}>
                    <div className="block">
                        <Form layout="vertical">
                        <SelectSupplier changeSupplierId={setSupplierId}/>
                        </Form>
                    </div>

                    <div className="block">
                        <Form layout="vertical">
                            <Select style={{ width: '100%', marginBottom: 10, borderRadius: 5 }} size={'large'}
                                         showSearch
                                         placeholder="Nhấn để chọn nhà cung cấp"
                                         optionFilterProp="children"

                                // defaultValue={supplierId}
                                //          onChange={handleSelectSupplier}
                                //          filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                                //          filterSort={(optionA, optionB) =>
                                //              (optionA!.children as unknown as string)
                                //                  .toLowerCase()
                                //                  .localeCompare((optionB!.children as unknown as string).toLowerCase())
                                //          }
                                         dropdownRender={menu => (
                                             <>
                                                 {menu}
                                                 <Divider style={{ margin: '8px 0' }} />
                                                 <Space style={{ padding: '0 8px 4px' }}>
                                                     <Button disabled={pageNumber <= 1} onClick={() => setPageNumber(cur => cur -1)} type="primary" icon={<BackwardOutlined />}>
                                                         Back
                                                     </Button>
                                                     <Button disabled={pageNumber >= totalPage} onClick={() => setPageNumber(cur => cur +1)} type="primary" icon={<FastForwardOutlined />}>
                                                         Next
                                                     </Button>
                                                 </Space>
                                             </>
                                         )}
                            >
                                {
                                    productVariants && productVariants.map((productVariant, index) => {
                                        return (
                                                <Option key={index} value={productVariant.id}>
                                                <div style={{display:"flex",justifyContent:"space-between",fontSize:'12px',padding:'10px'}}>
                                                    <div>
                                                        {productVariant.code} <br/> {productVariant.name}
                                                    </div>
                                                    <div>
                                                        {/*<CurrencyFormat value={productVariant.importPrice } displayType={'text'}*/}
                                                        {/*                thousandSeparator={true}*/}
                                                        {/*                suffix={' đ'}/>*/}
                                                        <br/> Số lượng: <b> {productVariant.quantity}</b>

                                                    </div>
                                                </div>
                                                </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form>
                    </div>
                </Col>
                <Col span={8}>

                </Col>
            </Row>
        </div>
    )
}
export default CreateImport