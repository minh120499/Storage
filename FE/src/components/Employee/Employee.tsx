import { useMutation } from "@tanstack/react-query";
import { Avatar, Form, Input, Modal, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import { useState } from "react";
import Role from "./Role";
import RoleSelect from "./RoleSelect";
import { Button, EditIcon, DeletedIcon, Table } from "../../UI";
import { accountApi } from "../../api";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

function Employee() {
  const columns: ColumnsType<DataType> = [
    // {
    //   title: <b>ID</b>,
    //   dataIndex: "id",
    //   render: (text: string) => <a href={`./employees/${text}`}>{text}</a>,
    // },
    {
      title: <b>Ảnh</b>,
      dataIndex: "employee",
      render: ([employees]) => { 
        console.log(employees)
        
        return(
        <Avatar
          style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
          src={employees?.avatar}
        >
          {employees?.avatar || employees?.fullName}
        </Avatar>
      )},
    },
    {
      title: <b>Họ & Tên</b>,
      dataIndex: "employee",
      render: ([employees]) => <div>{employees?.fullName || "--.--"}</div>,
    },
    {
      title: <b>SĐT</b>,
      dataIndex: "employee",
      render: ([employees]) => <div>{employees?.phone || "--.--"}</div>,
    },
    {
      title: <b>Email</b>,
      dataIndex: "employee",
      render: ([employees]) => <div>{employees?.email || "--.--"}</div>,
    },
    {
      title: <b>Địa chỉ</b>,
      dataIndex: "employee",
      render: ([employees]) => <div>{employees?.address || "--.--"}</div>,
    },
    {
      title: <b>Chức vụ</b>,
      dataIndex: ["roles"],
      render: (roles, empId: any) => (
        <Role roles={roles} empId={empId?.id} />
      ),
    },
    {
      title: "",
      dataIndex: "id",
      render: () => (
        <Space>
          <EditIcon />
          <DeletedIcon />
        </Space>
      ),
    },
  ];

  let currentRoles: string[] = [];

  const setRole = (e: any) => {
    currentRoles = e;
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeForm] = Form.useForm();
  const postEmployee = useMutation((newEmployee: any) => {
    return axios.post("http://localhost:8080/api/account", newEmployee);
  });

  const addEmployeeHandle = () => {
    const { username, password, fullName, email, phone, address, roles } =
      employeeForm.getFieldsValue();
      console.log(roles);
      
    postEmployee.mutate({
      username,
      password,
      fullName,
      email,
      phone,
      address,
      roleString: roles,
    });

    // setIsModalVisible(false);
  };

  return (
    <div className="m-5">
      <div>
        <Button onClick={() => setIsModalVisible(true)}>Thêm nhân viên</Button>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
        }}
        columns={columns}
        query={accountApi}
        rowKey="id"
      />
      <Modal
        title={"Thêm nhân viên"}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          employeeForm.resetFields();
        }}
        footer={null}
        closeIcon={<div></div>}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
          name="addEmployee"
          onFinish={addEmployeeHandle}
          onFinishFailed={() => console.log(currentRoles)}
          className=""
          form={employeeForm}
        >
          <Form.Item
            rules={[{ required: true, message: "Please input your username!" }]}
            label="Tài khoản"
            name="username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input your name!" }]}
            label="Họ tên"
            name="fullName"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                pattern: new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>
          <RoleSelect getRole={setRole} />
          <Form.Item {...{ wrapperCol: { offset: 4, span: 16 } }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Employee;
