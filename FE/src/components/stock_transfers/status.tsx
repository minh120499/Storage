import { useQueries, useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
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
  const { id } = useParams();
  const [exportById, setExportById] = useState<exportById>();
  const [detailExport, setDetailExport] = useState<any>();
  const [inventorySend, setInventorySend] = useState<exportInventory>();
  const [inventoryReceive, setInventoryReceive] = useState<receiveInventory>();

  const data = async () => {
    const exportData = await findExportById(item);
    setExportById(exportData);
    const detailExport = findDetailByExport(item);
    setDetailExport(detailExport);
    const exportByInventory = await findInventoryById(
      exportData.exportInventory
    );
    setInventorySend(exportByInventory);
    const exportReceive = await findInventoryById(exportData.receiveInventory);
    setInventoryReceive(exportReceive);
  };
  useEffect(() => {
    data();
  }, []);

  console.log(inventorySend);
  if (id === undefined) {
    return <div></div>;
  }
  const item = Number.parseInt(id);
  return <div>a</div>;
};
