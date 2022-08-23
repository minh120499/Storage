import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import "../../styles/Category.css"




interface DataType {
  id: string
  name: string;
  description: string
}

export default function Categories() {
  const [response, setResponse] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState(false);
  const [formAdd] = Form.useForm();



  /*Call api*/
  useEffect(function getAll() {
    axios.get(`http://localhost:8080/api/categories`)
      .then(response => {
        setResponse(response.data);
      }).catch(error => {
        console.log(error);
      });
  }, [status])


  /*Khởi tạo giá trị column*/
  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã danh mục',
      dataIndex: 'id',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
  ];


  /*Truyền data vào table*/
  const data: DataType[] = response;


  /*Các hàm xử lý*/
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleSubmit = () => {
    const { name, description } = formAdd.getFieldsValue();
    axios.post("http://localhost:8080/api/categories/category", {
      "name": name,
      "description": description
    }).catch(errors => {
      console.log(errors);
    })
    formAdd.resetFields();
    setIsModalVisible(false);
    setStatus(!status);
  };

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
      <h1 className="ant-typography">Danh mục</h1>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showModal}>
          Thêm mới
        </Button>
        <Modal title="Thêm mới Danh Mục" visible={isModalVisible} footer={null} onCancel={handleCancel}>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={handleSubmit}
            form={formAdd}
          >
            <Form.Item name='name' label="Tên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='description' label="Mô tả" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button htmlType="button" onClick={handleCancel}>
                Cancle
              </Button>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  )
}
