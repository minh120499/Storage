import React, { useEffect, useState } from "react";
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import "../../styles/Category.css";
import ToastCustom from "../../features/toast/Toast";
import Swal from "sweetalert2";
import CategoryCareate from "./CategoryCreate";
import CategoryUpdate from "./CategoriesUpdate";
import CategoryDelete from "./CategoryDelete";

interface DataType {
  id: string
  name: string;
  description: string
}

export default function Categories() {
  const [response, setResponse] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [status, setStatus] = useState(false);

  useEffect(function getAll() {
    axios.get(`http://localhost:8080/api/categories`)
      .then(response => {
        setResponse(response.data);
      }).catch(error => {
        console.log(error);
      });
  }, [status])

  const data: DataType[] = response;

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


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  let hasSelected = selectedRowKeys.length > 0;
  let hasOneSelected = selectedRowKeys.length === 1;

  const handleDelete = () => {
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
        axios.post("http://localhost:8080/api/categories/delete", selectedRowKeys).then(() => {
          ToastCustom.fire({
            icon: 'success',
            title: 'Delete category successfully'
          }).then(r => {
            setStatus(!status);
          })
          setSelectedRowKeys([])
        })
      }
    })
  }


  return (
    <>
      <h1 className="ant-typography">Danh mục</h1>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
        <CategoryCareate status={() => setStatus(!status)} />
        <CategoryDelete selectedKey = {selectedRowKeys}  status={() => setStatus(!status)} selected={hasSelected} setSelected={()=>setSelectedRowKeys([])}/>
        <CategoryUpdate selectedOne = {hasOneSelected} status={() => setStatus(!status)} idUpdate={selectedRowKeys[0]} />
        <div>

        </div>
      </div>
      <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  )
}
