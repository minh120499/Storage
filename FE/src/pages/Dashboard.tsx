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
      <Sider collapsible >
        <SideBar />
      </Sider>
      <Layout className="site-layout">
        <Header className="top-header z-10" style={{ padding: 0 }}>
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
