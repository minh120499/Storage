import SideBar from "../components/SideBar";
import HeaderMenu from "../components/Header";

import { Layout } from "antd";
import { Outlet } from "react-router";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Sider, Content, Header } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* {collapsed ? (
        <Sider
        className={collapsed ? "fixed z-10" : "relative"}
        >
          <SideBar />
        </Sider>
      ) : (
        <Sider></Sider>
      )} */}
      <Sider
      className={collapsed ? "w-0" : ""}
      width={collapsed? "0": "192px"}
      >
        <SideBar />
      </Sider>

      <Layout className="site-layout">
        {/* <span className="text-white self-center mr-2 ml-5 hover:cursor-pointer">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span> */}
        <Header className="top-header flex" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuFoldOutlined
              className="h-max self-center m-5 cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MenuUnfoldOutlined
              className="h-max self-center m-5 cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
          <HeaderMenu />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
