import { Select, Form, Button } from "antd";
import React, { useState } from "react";
import { findProductById, getProducts } from "../../api/product_variant";
import "./file.css";
import { findInventoryById, getAllInventory } from "../../api/inventory";
import { Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createExport } from "../../api/export";
import { creatDetailExport } from "../../api/detail_export";


interface DataType {
  getProductById: any;
  id: number;
  code: string;
  name: string;
  product: {};
  stock: number;
  quantity: number;
}
type exportInventory = {
  id: number;
  code: string;
  name: string;
  address: string;
  createAt: string;
  updateAt: null;
  isDelete: boolean;
};
type receiveInventory = {
  id: number;
  code: string;
  name: string;
  address: string;
  createAt: string;
  updateAt: null;
  isDelete: boolean;
};

const Search: React.FC = () => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([] as any);
  const data: DataType[] = products;

  const [inventorySend, setInventorySend] = useState<exportInventory>();
  const [inventoryReceive, setInventoryReceive] = useState<receiveInventory>();

  const exportValue = {
    exportInventory: inventorySend,
    receiveInventory: inventoryReceive,
  };

  const handleQuantity = (e: any) => {
    const quantity = e.target.value;
    const id = e.target.id * 1;
    console.log(id);

    const isFound = products.findIndex((element: any) => {
      return element.getProductById.id === id;
    });

    if (isFound >= 0) {
      products[isFound].quantity = quantity * 1;
      setProducts(products);
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã hàng",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.data.code}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.data.name}</div>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: ["quantity", "getProductById"],
      render: (a, text) => {
        console.log(text)
        return (
          <input
            type={"number"}
            style={{ width: "50px" }}
            onChange={handleQuantity}
            id={text?.getProductById.data.id}
            value={text?.quantity}
            key={text?.getProductById.data.id}
            min={"0"}
          ></input>
        );
      },
    },
    {
      dataIndex: ["quantity", "getProductById"],
      render: () => {
        return <Button>X</Button>;
      },
    },
  ];

  useQuery(
    ["ListProduct"],
    () => {
      const searchProduct = async () => {
        const getList = await getProducts();
        setProduct(getList.data);
      };
      searchProduct();
    }
  );

  const handleClickOptionProduct = (e: any) => {
    const isFound = products.findIndex((element: any) => {
      if (element.getProductById.id === e) {
        return true;
      }
      return false;
    });

    const hanldeClick = async () => {
      const getProductById = await findProductById(e);

      const a = {
        getProductById,
        quantity: 1,
      };
      setProducts([...products, a]);
    };
    if (isFound < 0) {
      hanldeClick();
    } else {
      console.log(products);
      products[isFound].quantity += 1;
      console.log(products);

      setProducts(products);
      console.log("san pham da chon");
    }
  };
  /* ------------------ select inventory --------------- */
  // console.log(products);
  const [inventories, setInventory] = useState([] as any);
  useQuery(
    ["getListInventory"],
    () => {
      const getListInventories = async () => {
       const listInventory= await getAllInventory();
          setInventory(listInventory.data);
        };

      getListInventories();
    }
  );
  const handleClickOptionSend = async (e: any) => {
    const inventorySend = await findInventoryById(e);
    setInventorySend(inventorySend.data);
  };
  const handleClickOptionReceive = async (e: any) => {
    const inventoryReceive = await findInventoryById(e);
    setInventoryReceive(inventoryReceive.data);
  };
  //--------------------- form -------------------

  const handleSubmit = async () => {
    const saveExport = await createExport(exportValue);
    const exportId = saveExport.data.id;
    const detailExport = products.map((e: any) => {
      return {
        productVariant: e.getProductById.data.id,
        quantity: e.quantity,
        export: exportId,
      };
    });
    creatDetailExportSubmit.mutate(detailExport);
  };

  const creatDetailExportSubmit = useMutation((item: any) =>
    creatDetailExport(item)
  );

  return (
    <>
      <div className="content">
        <div className="background-export">
          <h3>Thông tin sản phẩm</h3>
          <Select
            showSearch
            clearIcon
            style={{ width: "100%" }}
            dropdownStyle={{ height: 150, width: 1000 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            onSelect={handleClickOptionProduct}
          >
            {product.map((item: any) => (
              <Select.Option
                style={{ width: 600 }}
                key={item.id}
                value={item.id}
              >
                {item.name}
              </Select.Option>
            ))}
          </Select>

          <Radio.Group value={"checkbox"}></Radio.Group>

          <Table
            columns={columns}
            dataSource={data}
            style={{ width: "100%" }}
          />
        </div>

        <div className="select-inventory">
          <div>
            <h3>Thông tin phiếu chuyển</h3>
          </div>
          <h4>Chi nhánh gửi</h4>
          <Select
            showSearch
            style={{ width: 200 }}
            dropdownStyle={{ height: 150, width: 300 }}
            placeholder="Search to Select"
            optionFilterProp="children"
          
            onSelect={handleClickOptionSend}
          >
            {inventories.map((item: any) => (
              <Select.Option
                style={{ width: 200 }}
                key={item.id}
                value={item.id}
              >
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <h4>Chi nhánh nhận</h4>
          <Select
            showSearch
            style={{ width: 200 }}
            dropdownStyle={{ height: 150, width: 300 }}
            placeholder="Search to Select"
            optionFilterProp="children"

            onSelect={handleClickOptionReceive}
          >
            {inventories.map((item: any) => (
              <Select.Option
                style={{ width: 200 }}
                key={item.id}
                value={item.id}
              >
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <div>
            <h4>Ghi chú</h4>
            <textarea
              rows={4}
              style={{ width: "100%" }}
              defaultValue={"ok"}
            ></textarea>
          </div>
        </div>
      </div>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </>
  );
};

export default Search;
