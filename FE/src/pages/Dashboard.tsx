import SideBar from "../components/SideBar";
import HeaderMenu from "../components/Header";

import { Layout } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router";
const { Sider, Content, Header } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{minHeight: "100vh"}}>
      <Sider width="auto">
        <SideBar />
      </Sider>
      <Layout className="site-layout">
        <Header className="top-header" style={{ padding: 0 }}>
          {/* {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )} */}
          <HeaderMenu />
        </Header>
        <Content
          className="site-layout-background"
          style={{
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
