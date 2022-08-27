import React, { useState } from "react";
import { Modal, Form, Input, Space } from 'antd';
import ToastCustom from "../../features/toast/Toast";
import { Category } from "../../type/allType";
import { updateCategory } from "../../api/apiCategory";
import Button from "../../UI/Button"

type props = {

    status: () => void,
    categoryProp: any
}

export default function CategoryUpdate({ status, categoryProp }: props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formAdd] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        formAdd.resetFields();
        setIsModalVisible(false)
    }

    formAdd.setFieldsValue({
        id: categoryProp.id,
        name: categoryProp.name,
        description: categoryProp.description
        
    });

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

    const handleUpdate = (category: Category) => {
        updateCategory(category, categoryProp.id).catch(error=>{
            console.log(error);
        });
        ToastCustom.fire({
            icon: 'success',
            title: 'Sửa thành công!'
        });
        formAdd.resetFields();
        status();
        setIsModalVisible(false);
    }
    return (
        <>

            <Button onClick={showModal} style={{ width: "55px" }} type="primary">
                <Space>
                    Sửa
                </Space>
            </Button>

            <Modal title="Sửa Danh Mục" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <Form
                    {...layout}
                    name="nest-messages"
                    validateMessages={validateMessages}
                    onFinish={handleUpdate}
                    form={formAdd}
                >
                    <Form.Item name='name' label="Nhập tên" rules={[{ required: true }]}>
                        <Input placeholder="Tên" />
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