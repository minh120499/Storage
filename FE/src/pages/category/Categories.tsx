import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import "../../styles/Category.css";
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoriesUpdate";
import CategoryDelete from "./CategoryDelete";
import {Category} from "../../type/allType"


export default function Categories() {
  const [response, setResponse] = useState<Category[]>([]);
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

  return (
    <>
      <h1 className="ant-typography">Danh mục</h1>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
        <CategoryCreate status={() => setStatus(!status)} />
        <CategoryDelete selectedKey = {selectedRowKeys}  status={() => setStatus(!status)} selected={hasSelected} setSelected={()=>setSelectedRowKeys([])}/>
        <CategoryUpdate selectedOne = {hasOneSelected} status={() => setStatus(!status)} idUpdate={selectedRowKeys[0]} />
      </div>
      <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  )
}
