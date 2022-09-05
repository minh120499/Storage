import { UseQueryResult } from "@tanstack/react-query";
import { Input, Select } from "antd";
import React from "react";
import { findInventoryById } from "../../../api/inventory";
import { inventory } from "../../type/data_type";

type prop = {
  setInventorySend: (e: any) => void;
  setInventoryReceive: (e: any) => void;
  listInventory: UseQueryResult<any, unknown>;
};

export const SelectInventory = ({
  setInventorySend,
  setInventoryReceive,
  listInventory,
}: prop) => {
  const handleClickOptionSend = async (e?: number) => {
    const exportByInventory = await findInventoryById(e);
    setInventorySend(exportByInventory);
  };
  const handleClickOptionReceive = async (e?: number) => {
    const exportReceive = await findInventoryById(e);
    setInventoryReceive(exportReceive);
  };
  return (
    <div className="select-inventory">
      <div className="title">
        <h3>Thông tin phiếu</h3>
      </div>
      <div className="select-inventory-left">
        <div className="select-inventory-top">
          <div className="title-p">
            <p>Chi nhánh chuyển</p>
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
            <p>Chi nhánh nhận</p>
          </div>
          <Select
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ height: 150, width: 3000000 }}
            placeholder="Tìm kiếm chi nhánh"
            optionFilterProp="children"
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
