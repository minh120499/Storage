import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { getAllInventory } from "../../api/inventory";
import "./file.css";

const Option = Select;

const SelectInventory: React.FC = () => {
  const [inventories, setInventory] = useState([] as any);
  useEffect(() => {
    const getListInventories = async () => {
      await getAllInventory().then((res) => {
        setInventory(res.data);
        console.log(res.data);
      });
    };
    getListInventories();
  }, []);
  // console.log(inventories)
  const handleClickOption = (e: any) => {
    console.log(e);
  };
  return (
    <div className="select-inventory">
      <div><h3>Thông tin phiếu chuyển</h3></div>
      <h4>Chi nhánh gửi</h4>
      <Select
        showSearch
        style={{ width: 200 }}
        dropdownStyle={{ height: 150, width: 300 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input)
        }
        filterSort={(optionA, optionB) =>
          (optionA!.children as unknown as string)
            .toLowerCase()
            .localeCompare(
              (optionB!.children as unknown as string).toLowerCase()
            )
        }
        onSelect={handleClickOption}
      >
        {inventories.map((item: any) => (
          <Option style={{ width: 200 }} key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <h4>Chi nhánh nhận</h4>
      <Select
        showSearch
        style={{ width: 200 }}
        dropdownStyle={{ height: 150, width: 300 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input)
        }
        filterSort={(optionA, optionB) =>
          (optionA!.children as unknown as string)
            .toLowerCase()
            .localeCompare(
              (optionB!.children as unknown as string).toLowerCase()
            )
        }
        onSelect={handleClickOption}
      >
        {inventories.map((item: any) => (
          <Option style={{ width: 200 }} key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <div>
        <h4>Ghi chú</h4>
        <textarea rows={4} style={{width:'100%'}}> </textarea>
      </div>
    </div>
  );
};

export default SelectInventory;
