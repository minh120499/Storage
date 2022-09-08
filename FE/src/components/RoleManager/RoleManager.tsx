import { useMutation } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { rolesApi } from "../../api";
import { IRole } from "../../interface";
import { EditIcon } from "../../UI";
import { Table, Button } from "../../UI";

const RoleManager = () => {
  const columns: ColumnsType<IRole> = [
    {
      title: <b>STT</b>,
      dataIndex: "id",
      render: (index, t) => <div>{index}</div>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: <b>Chức vụ</b>,
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: <b>Mô tả</b>,
      dataIndex: "description",
      render: (text: string) => {
        return <div>{text}</div>;
      },
    },
    {
      render: (_, record: IRole) => {
        return (
          <div>
            <EditIcon
              type="primary"
              onClick={() => {
                addRoleForm.setFieldsValue({
                  id: record.id,
                  name: record.name,
                  description: record.description,
                });
                setAddRoleModal(true);
                setMode("update");
              }}
            ></EditIcon>
          </div>
        );
      },
    },
  ];

  const addRoleMutation = useMutation((roleData: IRole) => {
    return axios.post("http://localhost:8080/api/admin/roles", roleData);
  });
  const updateRoleMutation = useMutation((roleData: IRole) => {
    return axios.patch("http://localhost:8080/api/admin/roles", roleData);
  });
  const deleteRoleMutation = useMutation((roleData: any) => {
    return axios.delete("http://localhost:8080/api/admin/roles", {
      data: roleData,
    });
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addRoleForm] = Form.useForm();
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [mode, setMode] = useState("new");
  const hasSelected = selectedRowKeys.length > 0;

  const deleteRoles = () => {
    deleteRoleMutation.mutate(selectedRowKeys);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const addNewRole = () => {
    const { name, description, id } = addRoleForm.getFieldsValue();
    const data: IRole = {
      id: 0,
      name,
      description,
    };
    if (mode !== "new ") {
      data.id = id;
      updateRoleMutation.mutate(data);
    } else {
      addRoleMutation.mutate(data);
    }
  };
  const handleCancel = () => {
    setAddRoleModal(false);
  };

  if (updateRoleMutation.isSuccess) {
    updateRoleMutation.reset();
    setAddRoleModal(false);
  }

  return (
    <div className="p-5">
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h1 style={{fontSize:'30px',margin:0,marginRight:10,marginBottom:'35px'}}>Chức vụ</h1>
        <div>
          <Button
              type="primary"
              onClick={deleteRoles}
              disabled={!hasSelected}
              loading={deleteRoleMutation.isLoading}
          >
            Xóa
          </Button>
          <Button
              type="primary"
              onClick={() => {
                setAddRoleModal(true);
                setMode("new");
              }}
          >
            Thêm
          </Button>
          <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} mục` : ""}
        </span>
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        query={rolesApi}
        columns={columns}
        rowKey="id"
      />

      {addRoleModal && (
        <Modal
          title={mode === "new" ? "Thêm chức vụ" : "Sửa thông tin"}
          visible={addRoleModal}
          onOk={addNewRole}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              onClick={addNewRole}
              loading={updateRoleMutation.isLoading}
            >
              {mode === "new" ? "Tạo" : "Cập nhập"}
            </Button>,
            <Button key="back" onClick={handleCancel} mode="cancel">
              Hủy
            </Button>,
          ]}
        >
          <Form
            form={addRoleForm}
            name="addRoleForm"
            {...{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
          >
            <Form.Item label="Tên" name="id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true }, { message: "Tên không để trống!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true }, { message: "Mô tả không để trống!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default RoleManager;
