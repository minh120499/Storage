import { color } from "@mui/system";
import { Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { findInventoryById } from "../../../api/inventory";
import { inventory } from "../../type/data_type";

type prop = {
  setInventorySend: (e: any) => void;
  setInventoryReceive: (e: any) => void;
  setInventoryId: (e: any) => void;
  setCode: (e: any) => void;
  listInventory: any;
};

export const SelectInventory = ({
  setInventorySend,
  setInventoryReceive,
  setInventoryId,
  listInventory,
  setCode,
}: prop) => {
  const [inSend, setInSend] = useState(listInventory);
  const [inReceive, setInReceive] = useState(listInventory);
  const [a, setA] = useState(1);
  useEffect(() => {
    if (listInventory === undefined) {
      setA(a + 1);
    }
    setInSend(listInventory);
    setInReceive(listInventory);
  }, [a]);
  const handleClickOptionSend = async (e: any) => {
    setInventoryId(e);
    const exportByInventory = await findInventoryById(e);
    setInventorySend(exportByInventory);
    setInReceive(listInventory.filter((i: any) => i.id !== e));
  };
  const handleClickOptionReceive = async (e?: number) => {
    const exportReceive = await findInventoryById(e);
    setInventoryReceive(exportReceive);
    setInSend(listInventory.filter((i: any) => i.id !== e));
  };
  const handleCode = (e: any) => {
    setCode(e.target.value);
  };
  return (
    <div className="select-inventory">
      <div className="title">
        <h3>Thông tin phiếu</h3>
      </div>
      <div className="select-inventory-left">
        <div className="select-inventory-top">
          <div className="title-p">
            <p>Chi nhánh chuyển </p>
            <span style={{ color: "red" }}>*</span>
          </div>
          <Select
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ height: 150, width: 1000000 }}
            onSelect={handleClickOptionSend}
            placeholder="Tìm kiếm chi nhánh"
          >
            {inSend &&
              inSend.map((item: inventory) => (
                <Select.Option
                  style={{ width: "100%" }}
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </Select.Option>
              ))}
          </Select>
        </div>
        <div className="select-inventory-top">
          <div className="title-p">
            <p>Chi nhánh nhận </p>
            <span style={{ color: "red" }}>*</span>
          </div>
          <Select
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ height: 150, width: 3000000 }}
            placeholder="Tìm kiếm chi nhánh"
            onSelect={handleClickOptionReceive}
          >
            {inReceive &&
              inReceive.map((item: inventory) => (
                <Select.Option
                  style={{ width: "100%" }}
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </Select.Option>
              ))}
          </Select>
        </div>
      </div>
      <div className="select-inventory-left">
        <div className="select-inventory-top">
          <div className="title-p">
            <p>Mã phiếu chuyển</p>
          </div>
          <Input placeholder="Nhập mã phiếu" onChange={handleCode} />
        </div>
        <div className="select-inventory-top"></div>
      </div>
    </div>
  );
};
