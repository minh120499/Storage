import { useQuery } from "@tanstack/react-query";
import { Form, Select, Tag } from "antd";
import axios from "axios";
import { roleColor } from "../../constant";
import { IRole, IRoleLable } from "../../interface";

let roleChildren: any = [];
export default function RoleSelect(props: any) {
  useQuery(["roleid"], async () => {
    const { data } = await axios.get("http://localhost:8080/api/admin/roles");
    roleChildren = [...data];
  });

  const tagRender = (props: any) => {
    const { label } = props;

    return (
      <Tag
        // color={roleColor[label as keyof IRoleLable]}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

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
        tagRender={tagRender}
        dropdownMatchSelectWidth={false}
        getPopupContainer={(trigger) => trigger}
        virtual={false}
      >
        {roleChildren.map((child: IRole) => {
          return <Select.Option key={child.name}>{child.name}</Select.Option>;
        })}
      </Select>
    </Form.Item>
  );
}
