import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Input, InputNumber, Menu, MenuProps, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import "../../styles/Category.css";
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoriesUpdate";
import { Category,EditableCellProps } from "../../type/allType"
import { deleteCategory, getCategories } from "../../services/apiCategory";
import { Link } from "react-router-dom";
import {DeleteOutlined, DownOutlined} from '@ant-design/icons';
import Swal from "sweetalert2";
import ToastCustom from "../../features/toast/Toast";
 
export default function Categories() {
  const [response, setResponse] = useState<Category[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [status, setStatus] = useState(false);
  

  useEffect(function getAll() {
    getCategories().then(response => {
      setResponse(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, [status])

  const data: Category[] = response;

  const columns: ColumnsType<Category> = [
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
    {
      title: 'Thao tác',
      render: ()=>{
        return (
          <button style={{ width: "80px", fontSize: '14px' }}>Sửa</button>
        )
      }
    }
  ];


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  let hasSelected = selectedRowKeys.length > 0;
  let hasOneSelected = selectedRowKeys.length === 1;

  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    switch (e.key) {
      case '1':
        onDelete(selectedRowKeys);
        break
    }
  };

  const onDelete = async (listId: React.Key[]) => {
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
        deleteCategory(listId).then(() => {
              ToastCustom.fire({
                  icon: 'success',
                  title: 'Delete category successfully'
              }).then(r => {
              })
              setStatus(!status)
              setSelectedRowKeys([])
          })

      }
  })
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: <Link to="#">Xóa danh mục</Link>,
          key: '1',
          icon: <DeleteOutlined />,
        },
      ]}
    />
  );


  return (
    <>
      <h1 className="ant-typography">Danh mục</h1>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Dropdown overlay={menu} disabled={!hasSelected}>
            <Button style={{ width: "180px", fontSize: '14px' }} type="primary">
              <Space>
                Thao tác
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <span style={{ marginLeft: 8, marginRight: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} istems` : ''}</span>
        </div>
        <CategoryCreate status={() => setStatus(!status)} />
        {/* <CategoryUpdate selectedOne={hasOneSelected} status={() => setStatus(!status)} idUpdate={selectedRowKeys[0]} /> */}
      </div>
      <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  )
}
