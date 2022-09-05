import {
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
// import AddProduct from "../pages/product/AddProduct";

import "../styles/SideBar.css";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

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
  getItem("Đơn vị vận chuyển", "/transport-companies", <LocalShippingIcon />),

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
  // getItem("Đơn vị vận chuyển", "/transport-companies", <AppstoreOutlined />),
  // getItem("Đơn vị vận chuyển", "/transport-companies", <LocalShippingIcon />),

  getItem("Nhà cung cấp", "/supplier", <ShopOutlined />),
  getItem("Kho hàng", "", <WarehouseIcon />, [
    getItem("Danh sách", "/stocker/inventories"),
    // getItem("Quản lý", "/stocker/manager"),
  ]),

  getItem("Nhân viên", null, <TeamOutlined />, [
    getItem("Danh sách", "/api/admin/employees"),
    getItem("Roles", "/api/admin/roles/"),
  ]),
  getItem("Đăng xuất", "/login", <LogoutIcon />),
];

const SideBar: React.FC = () => {
  const roles = useSelector((state: RootState) => state.user.authorities);
  // console.log(roles);

  const navigate = useNavigate();

  return (
    // <div className="side-bar">
    <>
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
        <Menu
          // style={{ width: 256 }}
          mode="inline"
          theme="dark"
          items={items}
          onClick={(e) => {
            navigate(e.key);
          }}
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default SideBar;
