import React, { useState } from "react";
import { Button, Modal, Form, Input, Space } from 'antd';
import axios from "axios";
import ToastCustom from "../../features/toast/Toast";

type props = {
    selectedOne: boolean,
    status: () => void,
    idUpdate: any
}

export default function CategoryUpdate({ selectedOne, status, idUpdate}: props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formAdd] = Form.useForm();
    

    const handleUpdate = () =>{
        const { name, description } = formAdd.getFieldsValue();
        axios.put(`http://localhost:8080/api/categories/category/${idUpdate}`, {
            "name": name,
            "description": description
        });
        ToastCustom.fire({
            icon: 'success',
            title: 'Sửa danh mục thành công!'
        });
        formAdd.resetFields();
        status();
        setIsModalVisible(false);
    }


    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        formAdd.resetFields();
        setIsModalVisible(false)
    }



    const validateMessages = {
        required: 'Không được để trống!',
    };

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 13, span: 16 },
        labelCol: { span: 100 },
    };
    return (
        <>
            <div>
                <Button onClick={showModal} style={{ width: "121px"}} type="primary" disabled={selectedOne?false:true}>
                    <Space>
                        Sửa danh mục
                    </Space>
                </Button>
            </div>
            <Modal title="Sửa Danh Mục" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <Form
                    {...layout}
                    name="nest-messages"
                    validateMessages={validateMessages}
                    onFinish={handleUpdate}
                    form={formAdd}
                >
                    <Form.Item name='name' label="Nhập tên" rules={[{ required: true }]}>
                        <Input placeholder="Tên"/>
                    </Form.Item>
                    <Form.Item name='description' label="Nhập mô tả" rules={[{ required: true }]}>
                        <Input placeholder="Mô tả" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button htmlType="button" onClick={handleCancel}>
                            Cancle
                        </Button>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}