import SideBar from "../components/SideBar";
import HeaderMenu from "../components/Header";
import { Routes, Route, useParams, useLocation } from "react-router-dom";

import { Layout } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import Authen from "../components/Authen";
const { Sider, Content, Header } = Layout;


const Dashboard: React.FC = () => {
    return (
        <Layout style={{ height: "100vh" }}>
            <Sider breakpoint="xl" collapsible>
                <SideBar />
            </Sider>
            <Layout className="site-layout">
                {!useLocation().pathname.includes("stock_transfers") && (
                    <Header className="top-header z-10"
                        // style={{ padding: 0,boxShadow: "1px 0px 5px 1px black" }}
                    >
                        <HeaderMenu />
                    </Header>
                )}
                <Content>
                    <Authen />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
