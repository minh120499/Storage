import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";
import axios from "axios";
import { IRole } from "../../interface";

let roleChildren: any = [];
export default function RoleSelect(props: any) {
  useQuery(["roleid"], async () => {
    const { data } = await axios.get("http://localhost:8080/api/admin/roles");
    roleChildren = [...data];
  });
  
  return (
    <Form.Item
      name="roles"
      label="Role"
      rules={[{ required: true }]}
      initialValue={props?.empRole || []}
    >
      <Select
        mode="multiple"
        allowClear
        placeholder="Please select"
        dropdownMatchSelectWidth={false}
        getPopupContainer={trigger => trigger}
        virtual={false}
      >
        {roleChildren.map((child: IRole) => {
          return <Select.Option key={child.name}>{child.name}</Select.Option>;
        })}
      </Select>
    </Form.Item>
  );
}
