import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, Space, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import "../../styles/Category.css";
import ToastCustom from "../../features/toast/Toast";
import Swal from "sweetalert2";

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


  /*Lấy danh sách danh mục*/
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


  /*Các hàm xử lý table*/
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0

  /*Thêm danh muc*/
  const handleSubmit = () => {
    const { name, description } = formAdd.getFieldsValue();
    axios.post("http://localhost:8080/api/categories/category", {
      "name": name,
      "description": description
    }).catch(errors => {
      console.log(errors);
    });
    ToastCustom.fire({
      icon: 'success',
      title: 'Thêm danh mục thành công!'
    }).then()

    formAdd.resetFields();
    setIsModalVisible(false);
    setStatus(!status);
  };

  /*Xoá danh mục*/
  const handleDelete = () =>{
    Swal.fire({
      title: 'Bạn có chắc?',
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete!'
  }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:8080/api/categories/delete",selectedRowKeys).then(() => {
              ToastCustom.fire({
                  icon: 'success',
                  title: 'Delete category successfully'
              }).then(r => {
              })
              setSelectedRowKeys([])
          })
      }
  }) 
  }
  /*Validate form*/
  const validateMessages = {
    required: 'Không được để trống!',
  };

  /*Open modal*/
  const showModal = () => {
    setIsModalVisible(true);
  };

  /*Close modal*/
  const handleCancel = () => {
    formAdd.resetFields();
    setIsModalVisible(false)
  }

  /*Layout form*/
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
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <Button type="primary" onClick={handleDelete} disabled={hasSelected?false:true} >
            Xoá danh mục
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
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
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  )
}
