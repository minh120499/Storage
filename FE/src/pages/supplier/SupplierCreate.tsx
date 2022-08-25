import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Select, Space} from 'antd';
import "antd/dist/antd.css";
import {TypeSupplier} from "../../services/customType";
import {createSupplier, getDistrict, getProvince, getWard} from "../../services/api";
import ToastCustom from "../../features/toast/Toast";
import AddAddress from "../../components/AddAddress";
import {PlusOutlined} from '@ant-design/icons';

type SupplierProps = {
    reload: () => void
}

const SupplierCreate = ({reload}: SupplierProps) => {
    const {Option} = Select;

    const [form] = Form.useForm();
    const onFormSubmit = (supplier: TypeSupplier) => {
        supplier.accountId = Number(1)
        console.log(supplier);
        
        createSupplier(supplier).then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: 'Thêm nhà cung cấp thành công'
            }).then()
            setVisible(false);
            form.resetFields();
            reload()
            handleKeyChange()
        }).catch((err) => {
            const error = err.response.data.message
            console.log(err)
            ToastCustom.fire({
                icon: 'error',
                title: "Thêm nhà cung cấp thất bại",
                html: `${error}`
            }).then()
        })
    }
    const [visible, setVisible] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);


    const showModal = () => {
        setVisible(true);

    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        handleKeyChange()
    };


    const [fullAddress,setFullAddress] = useState("")
    const [keyChange, setKeyChange] = useState(0);

    const handleKeyChange = () => {
        setKeyChange(current => current + 1);
    };
    useEffect(() =>{
         form.setFieldsValue({
            address: fullAddress
        })
    },[fullAddress])

    return (



        <div>

            <Button onClick={showModal} style={{width: "180px", fontSize: '14px'}} type="primary">
                <Space>
                    <PlusOutlined />
                    Thêm mới
                </Space>
            </Button>
            <Modal
                title="Thêm mới nhà cung cấp"
                visible={visible}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={700}
                footer={[]}

            >
                <div style={{background: "white", padding: 24}}>
                    <Form
                        form={form}
                        onFinish={onFormSubmit}
                        layout="vertical"
                    >
                        <Form.Item label="Tên nhà cung cấp" name="name" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Mã nhà cung cấp " name="code">
                                    <Input placeholder="Nhập tên nhà cung cấp"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Phone" name="phone"
                                           rules={[
                                               {
                                                   required: true,
                                               },
                                               {
                                                   pattern: (/((09|03|07|08|05)+([0-9]{8})\b)/g),
                                                   message: "SĐT không hợp lệ!"
                                               }
                                           ]}>
                                    <Input placeholder="Nhập SĐT"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{required: true, type: "email"}]}>
                                    <Input placeholder="Nhập email"/>
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{height: '100%'}}>
                                <Form.Item label="Nhân viên phụ trách" name="account">
                                    <Select
                                        showSearch
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        // onChange={onChange}
                                        // onSearch={onSearch}
                                        listItemHeight={10} listHeight={250}
                                        filterOption={(input, option) =>
                                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }
                                        dropdownStyle={{height: 100, width: 100}}
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/*add address*/}

                       <AddAddress onChange = {setFullAddress} keyChange={keyChange}/>

                        {/*-------------------*/}

                        <Form.Item label="Địa chỉ" name="address">
                            <Input disabled  placeholder="địa chỉ nhà cung cấp"/>
                        </Form.Item>
                        <Row>
                            <Col span={4}>
                                <Form.Item>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary">Submit</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>

        </div>
    )
}
export default React.memo(SupplierCreate)