import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Input, Modal, Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useState } from "react";
import { rolesApi } from "../../api";
import { IRole } from "../../interface";
import Button from "../../UI/Button"

const RoleManager = () => {
  const columns: ColumnsType<IRole> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string) => {
        return hasSelected ? <Input defaultValue={text} /> : <div>{text}</div>;
      },
    },
    {
      render: () => {
        return (
          <div>
            <Button
              type="primary"
              // onClick={() => }
            >
              Update
            </Button>
          </div>
        );
      },
    },
  ];
  const { data, isLoading, error, isError } = useQuery(["roles"], rolesApi);
  const addRoleMutation = useMutation((roleData: IRole) => {
    return axios.post("http://localhost:8080/api/admin/roles", roleData);
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addRoleForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const hasSelected = selectedRowKeys.length > 0;

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const addNewRole = () => {
    const { name, description } = addRoleForm.getFieldsValue();
    addRoleMutation.mutate({
      name,
      description,
    });
  };
  addRoleMutation.data && setAddRoleModal(false);
  // UI //
  return (
    <div>
      <h2>Roles List</h2>
      {isLoading && <Skeleton />}
      {isError && <div>{"Network Error"}</div>}
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Delete
        </Button>
        <Button
         type="primary" onClick={() => setAddRoleModal(true)}
         >
          Add
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
        rowKey="id"
      />

      {addRoleModal && (
        <Modal
          title="Add role"
          visible={addRoleModal}
          onOk={() => addNewRole()}
          onCancel={() => setAddRoleModal(false)}
          footer={null}
        >
          <Form
            form={addRoleForm}
            name="addRoleForm"
            {...{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true }, { message: "Name is required!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true },
                { message: "Description is required!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={addRoleMutation.isLoading}
              {...{ wrapperCol: { offset: 6, span: 16 } }}
            >
              Add
            </Button>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default RoleManager;
