import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import Button from "./Button";

//datepicker

const FilterBox = (props: any) => {
  const menu = (
    <Menu
      items={[
        {
          label: <div>Tìm theo tên</div>,
          key: "name",
          onClick: (e) => props.click(e.key),
        },
      ]}    
    />
  );
  return (
    <div>
      <Dropdown overlay={props?.menu || menu} trigger={["click"]} {...props}>
        <Button>
          <Space>
            <span>Click me</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default FilterBox;
