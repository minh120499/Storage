import React, { useEffect, useState } from "react";
import { Dropdown, Menu, MenuProps, Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import "../../styles/Category.css";
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoriesUpdate";
import { Category } from "../../type/allType";
import {
  deleteListCategory,
  getCategories,
} from "../../api/apiCategory";
import { Link } from "react-router-dom";
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import ToastCustom from "../../features/toast/Toast";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Categories() {
  const [response, setResponse] = useState<Category[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [status, setStatus] = useState(false);

  useEffect(
    function getAll() {
      getCategories()
        .then((response) => {
          setResponse(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [status]
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0;

  const data: Category[] = response;

  const columns: ColumnsType<Category> = [
    {
      title: "Mã danh mục",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Thao tác",

      render: (row) => (
          <Space>
            <CategoryUpdate
              status={() => setStatus(!status)}
              categoryProp={row}
            />
            <DeleteIcon
              className="text-red-500"
              onClick={() => onDelete(row)}
            />
          </Space>
        )
      },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e: any) => {
    switch (e.key) {
      case "1":
        onDeleteList(selectedRowKeys);
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          
          label: <Link  to="#">Xóa danh mục</Link>,
          key: "1",
          icon: <DeleteOutlined />,
          danger: true
        },
      ]}
    />
  );

  const onDeleteList = async (listId: React.Key[]) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteListCategory(listId).then(() => {
          ToastCustom.fire({
            icon: "success",
            title: "Xoá thành công!",
          }).then((r) => {});
          setStatus(!status);
          setSelectedRowKeys([]);
        });
      }
    });
  };

  const onDelete = (row: any) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        const listId: number[]=[];
        listId.push(row.id)
        deleteListCategory(listId).then(() => {
          ToastCustom.fire({
            icon: "success",
            title: "Xoá thành công!",
          }).then((r) => {});
          setStatus(!status);
          setSelectedRowKeys([]);
        });
      }
    });
  };

  return (
    <>
      <h1 className="ant-typography">Danh mục</h1>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Dropdown overlay={menu} disabled={!hasSelected}>
            <Button type="primary" style={{ width: "180px", fontSize: "14px", marginLeft:"0px" }}>
              Thao tác
              <DownOutlined />
            </Button>
          </Dropdown>
          <span style={{ marginLeft: 8, marginRight: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} danh mục` : ""}
          </span>
        </div>
        <CategoryCreate status={() => setStatus(!status)} />
      </div>
      <Table
        rowKey={"id"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </>
  );
}
