import { Select } from "antd";
import type { SelectProps } from "antd";
import Table from "../../UI/Table";
const columns = [
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Ảnh",
    dataIndex: "image",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Phiên bản",
    dataIndex: "name",
  },
  {
    title: "Giá nhập",
    dataIndex: "name",
  },
  {
    title: "Trong kho",
    dataIndex: "name",
  },
];

const storages: SelectProps["options"] = [
  {
    label: "Hà Nội",
    value: "Hà Nội",
  },
  {
    label: "Hồ Chí Minh",
    value: "Hồ Chí Minh",
  },
];

const InventoryManager = () => {
  return (
    <div>
      <h2>Kho hàng</h2>
      <div>
        {/* <Table columns={columns} /> */}
        <div>
          <h2>Tổng quan</h2>
          {/* <Select options={storages} /> */}
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
