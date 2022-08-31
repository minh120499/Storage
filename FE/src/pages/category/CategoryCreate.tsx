import React, { useState } from "react";
import { Modal, Form, Input, Space } from "antd";
import ToastCustom from "../../features/toast/Toast";
import { Category } from "../../type/allType";
import { createCategory } from "../../api/apiCategory";
import Button from "../../UI/Button";

type props = {
  status: () => void;
};
export default function CategoryCreate({ status }: props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formAdd] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    formAdd.resetFields();
    setIsModalVisible(false);
  };

  const validateMessages = {
    required: "Không được để trống!",
  };
  /*Layout form*/
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 13, span: 16 },
    labelCol: { span: 100 },
  };

  const handleCreate = async (category: Category) => {
    await createCategory(category)
      .then(() => {
        ToastCustom.fire({
          icon: "success",
          title: "Thêm thành công!",
        });
        formAdd.resetFields();
        status();
        setIsModalVisible(false);
      })
      .catch(() => {
        ToastCustom.fire({
          icon: "error",
          title: "Thêm không thành công!",
        });
      });
  };
  return (
    <>
      <div>
        <Button onClick={showModal}>Thêm mới</Button>
      </div>
      <Modal
        title="Thêm mới Danh Mục"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          onFinish={handleCreate}
          form={formAdd}
        >
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input placeholder="Nhập Tên" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button mode="cancel" onClick={handleCancel}>
                Cancle
              </Button>
              <Button htmlType="submit">Submit</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
