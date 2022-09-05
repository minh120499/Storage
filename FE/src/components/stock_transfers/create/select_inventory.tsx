import { color } from "@mui/system";
import { UseQueryResult } from "@tanstack/react-query";
import { Input, message, Select } from "antd";
import React, { useState } from "react";
import { findInventoryById } from "../../../api/inventory";

type prop = {
  setInventorySend: (e: any) => void;
  setInventoryReceive: (e: any) => void;
  setInventoryId: (e: any) => void;
  listInventory: UseQueryResult<any, unknown>;
};

export const SelectInventory = ({
                                  setInventorySend,
                                  setInventoryReceive,
                                  setInventoryId,
                                  listInventory,
                                }: prop) => {
  const [valid, setValid] = useState<any>();
  const handleClickOptionSend = async (e?: number) => {
    setInventoryId(e);
    setValid(e);
    const exportByInventory = await findInventoryById(e);
    setInventorySend(exportByInventory);
  };
  const handleClickOptionReceive = async (e?: number) => {
    if (e === undefined) {
      message.error(
          <div style={{ color: "red" }}>Chi nhánh chưa được chọn</div>
      );
    }
    if (e === valid) {
      message.error(
          <div style={{ color: "red" }}>
            Chi nhánh nhận không được trùng với chi nhánh chuyển
          </div>
      );
    } else {
      const exportReceive = await findInventoryById(e);
      setInventoryReceive(exportReceive);
    }
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
                placeholder="Tìm kiếm chi nhánh"
                optionFilterProp="children"
                onSelect={handleClickOptionSend}
            >
              {listInventory?.data &&
                  listInventory.data.map((item: any) => (
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
              {listInventory?.data &&
                  listInventory.data.map((item: any) => (
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
            <Input placeholder="Nhập mã phiếu" />
          </div>
          <div className="select-inventory-top"></div>
        </div>
      </div>
  );
};

