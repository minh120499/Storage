import { useQueries, useQuery } from "@tanstack/react-query";
import { Button, Card, Space, Spin, Steps, Table, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findDetailByExport } from "../../api/detail_export";
import { findExportById } from "../../api/export";
import { findInventoryById } from "../../api/inventory";
import {
  exportById,
  exportInventory,
  receiveInventory,
} from "../type/data_type";

export const Status = () => {
  // const { id } = useParams();
  // const [exportById, setExportById] = useState<exportById>();
  // const [detailExport, setDetailExport] = useState<any>();
  // const [inventorySend, setInventorySend] = useState<exportInventory>();
  // const [inventoryReceive, setInventoryReceive] = useState<receiveInventory>();

  // const data = async () => {
  //   const exportData = await findExportById(item);
  //   setExportById(exportData);
  //   const detailExport = findDetailByExport(item);
  //   setDetailExport(detailExport);
  //   const exportByInventory = await findInventoryById(
  //     exportData.exportInventory
  //   );
  //   setInventorySend(exportByInventory);
  //   const exportReceive = await findInventoryById(exportData.receiveInventory);
  //   setInventoryReceive(exportReceive);
  // };
  // useEffect(() => {
  //   data();
  // }, []);

  // console.log(inventorySend);
  // if (id === undefined) {
  //   return <div></div>;
  // }
  // const item = Number.parseInt(id);
  return (
    <>
      <div id="top-head-status" className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div>
            <b>{"STN0015"}</b>{" "}
            <Tag className="rounded-3xl ml-3" color="purple">
              Chờ chuyển
            </Tag>
          </div>
          <div>
            <Space size="small">
              <Button>In phiếu</Button>
              <Button>In phiếu</Button>
              <Button>In phiếu</Button>
            </Space>
          </div>
        </div>

        <div>
          <Steps current={1} size="small">
            <Steps.Step title="Finished" description="This is a description." />
            <Steps.Step
              title="In Progress"
              subTitle="Left 00:00:08"
              description="This is a description."
            />
            <Steps.Step title="Waiting" description="This is a description." />
          </Steps>
        </div>
      </div>

      <div id="status-main" className="mt-5">
        <div className="grid grid-cols-6 gap-5">
          <Card
            className="col-span-4"
            title="Thông tin phiếu"
            extra={<a href="#">Xem lịch sử phiếu hàng</a>}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Thông tin bổ sung" className="col-span-2">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>

      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tab 1" key="1">
            <Table />;
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};
