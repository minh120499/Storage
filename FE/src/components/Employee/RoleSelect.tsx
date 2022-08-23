import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import axios from "axios";
import { IRole } from "../../interface";

let roleChildren: any = [];
export default function RoleSelect(props: any) {
  useQuery(["roleid"], async () => {
    const { data } = await axios.get("http://localhost:8080/api/roles");
    roleChildren = [...data];
  });

  return (
    <Select
      style={{ width: 300 }}
      dropdownStyle={{ height: 100, width: 100 }}
      mode="multiple"
      allowClear
      placeholder="Please select"
      onChange={(e) => props.getRole(e)}
      dropdownMatchSelectWidth={true}
      defaultValue={props?.empRole || []}
    >
      {roleChildren.map((child: IRole) => {
        return (
          <Select.Option key={child.name}>{child.name}</Select.Option>
        );
      })}
    </Select>
  );
}
