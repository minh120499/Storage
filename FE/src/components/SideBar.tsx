import {
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Menu } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import AddProduct from "../pages/product/AddProduct";
import "../styles/SideBar.css";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Quản lý sản phẩm", "sub1", <AppstoreOutlined />, [
    getItem("Thêm sản phẩm", "/productsAdd"),
    getItem("Danh sách sản phẩm", "/products"),
    getItem("Danh mục sản phẩm", "/categories"),
    getItem("Chuyển hàng", "/storage"),
  ]),
  getItem("Hàng hoá", "sub2", <AppstoreOutlined />, [
    // getItem("Quản lý kho", ""),
    getItem("Nhập hàng", "/purchase_orders/create"),
    // getItem("Chuyển hàng", "/321"),
  ]),
  getItem("Đơn vị vận chuyển", "/transport-companies", <AppstoreOutlined />),

  getItem("Nhà cung cấp", "/supplier", <CalendarOutlined />),

  ]),

  getItem("Nhân viên", null, <TeamOutlined />, [
    getItem("Danh sách", "/api/admin/employees"),
    getItem("Roles", "/api/admin/roles"),
  ]),
];

const SideBar: React.FC = () => {
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("dark");

  const navigate = useNavigate();

  const changeMode = (value: boolean) => {
    setMode(value ? "vertical" : "inline");
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <div className="side-bar">
      <div className="side-bar__brand-logo">
        <a href="/home">
          <img
            className="img-fill"
            src="https://bizweb.dktcdn.net/assets/admin/images/icon-svg/sub_logosapo-02.svg"
            alt="logo"
          />
        </a>
      </div>
      <div className="side-bar_menu">
        {/* <Switch onChange={changeMode} /> Change Mode */}
        {/* <Divider type="vertical" />
            <Switch onChange={changeTheme} /> Change Style */}
        {/* <br />
            <br /> */}

        <Menu
          style={{ width: 256, height: "100%" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode={mode}
          theme={theme}
          items={items}
          onClick={(e) => {
            navigate(e.key);
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
