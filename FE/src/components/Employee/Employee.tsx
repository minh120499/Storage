import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Avatar,
  // Button,
  Form,
  Input,
  Modal,
  Skeleton,
} from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import axios from "axios";
import { useState } from "react";
import Role from "./Role";
import RoleSelect from "./RoleSelect";
import { Button } from "../../UI";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "id",
    render: (text: string) => <a href={`./employees/${text}`}>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "employee",
    render: ([employees]) => <div>{employees?.fullName || "--.--"}</div>,
  },
  {
    title: "Phone",
    dataIndex: "employee",
    render: ([employees]) => <div>{employees?.phone || "--.--"}</div>,
  },
  {
    title: "Email",
    dataIndex: "employee",
    render: ([employees]) => <div>{employees?.email || "--.--"}</div>,
  },
  {
    title: "Address",
    dataIndex: "employee",
    render: ([employees]) => <div>{employees?.address || "--.--"}</div>,
  },
  {
    title: "Role",
    dataIndex: ["roles"],
    render: (roles, empId: any) => <Role roles={roles} empId={empId?.id} />,
  },
  {
    title: "Avatar",
    dataIndex: "employee",
    render: ([employees]) => (
      <Avatar
        style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
        src={employees?.avatar}
      >
        {employees?.avatar || employees?.fullName}
      </Avatar>
    ),
  },
];

let currentRoles: string[] = [];

const setRole = (e: any) => {
  currentRoles = e;
};

function Employee() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeForm] = Form.useForm();
  const { data, isLoading } = useQuery(["empid"], async () => {
    const { data } = await axios.get("http://localhost:8080/api/account");
    return data;
  });

  const postEmployee = useMutation((newEmployee: any) => {
    return axios.post("http://localhost:8080/api/account", newEmployee);
  });

  if (isLoading) {
    return <Skeleton />;
  }

  const addEmployeeHandle = () => {
    const { username, password, fullName, email, phone, address, roles } =
      employeeForm.getFieldsValue();
    postEmployee.mutate({
      username,
      password,
      fullName,
      email,
      phone,
      address,
      roleIds: roles,
    });

    setIsModalVisible(false);
  };

  return (
    <div>
      <div>
        <Button onClick={() => setIsModalVisible(true)}>Add employee</Button>
      </div>
      {data && (
        <Table
          rowSelection={{
            type: "checkbox",
          }}
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      )}
      <Modal
        title="Add New Employee"
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
          {...{ labelCol: { span: 4 }, wrapperCol: { span: 16 } }}
          name="addEmployee"
          onFinish={addEmployeeHandle}
          onFinishFailed={() => console.log(currentRoles)}
          className=""
          form={employeeForm}
        >
          <Form.Item
            rules={[{ required: true, message: "Please input your username!" }]}
            label="User name"
            name="username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input your name!" }]}
            label="Full name"
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
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
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
