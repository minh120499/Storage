import { Select, Form, Popconfirm } from "antd";
import React, { useRef, useState } from "react";
import { findProductById, getProducts } from "../../api/product_variant";
import "./file.css";
import { getAllInventory } from "../../api/inventory";
import { Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createExport } from "../../api/export";
import { creatDetailExport } from "../../api/detail_export";
<<<<<<< HEAD


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
=======
import { Button } from "antd";
import { DataType } from "../type/data_type";
import { DeleteTwoTone } from "@ant-design/icons";
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7

const Search: React.FC = () => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([] as any);
  const data: DataType[] = products;

  const [inventorySend, setInventorySend] = useState<number>();
  const [inventoryReceive, setInventoryReceive] = useState<number>();

  const exportValue = {
    exportInventory: inventorySend,
    receiveInventory: inventoryReceive,
  };
  const [status, setStatus] = useState(true);
  const handleQuantity = (e: any) => {
    const quantity = e.target.value;
    const id = e.target.id * 1;

    setProducts((prev: any) => {
      prev.map((prod: any) => {
        if (prod.getProductById.data.id === id) {
          prod.quantity = quantity;
        }
      });
      return [...prev];
    });
  };
  console.log(products);
  const handleDelete = (e: any) => {
    // const id = e.target.id * 1;
    const newData = products.filter(
      (item: any) => item.getProductById.data.id !== e
    );
    setProducts(newData);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã hàng",
      dataIndex: "getProductById",
      render: (text) => {
<<<<<<< HEAD
        return <div>{text?.data.code}</div>;
=======
        return <div>{text?.data?.code}</div>;
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "getProductById",
      render: (text) => {
<<<<<<< HEAD
        return <div>{text?.data.name}</div>;
=======
        return <div>{text?.data?.name}</div>;
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7
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
<<<<<<< HEAD
            value={text?.quantity}
            key={text?.getProductById.data.id}
=======
            key={text?.getProductById.data.id}
            value={text.quantity}
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7
            min={"0"}
          ></input>
        );
      },
    },
    {
      dataIndex: ["getProductById"],
      render: (text) => {
        return (
          <Popconfirm
            id={text?.data.id}
            key={text?.data.id}
            // onClick={handleDelete}
            title="Sure to delete?"
            onConfirm={() => handleDelete(text?.data.id)}
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      },
    },
  ];

<<<<<<< HEAD
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
=======
  useQuery(["ListProduct"], () => {
    const searchProduct = async () => {
      const getList = await getProducts();
      setProduct(getList.data);
    };
    searchProduct();
  });
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7

  const handleClickOptionProduct = (e: any) => {
    const isFound = products.findIndex((element: any) => {
      if (element.getProductById.data.id === e) {
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
      setProducts([a, ...products]);
    };
    if (isFound < 0) {
      hanldeClick();
    } else {
      setProducts((prev: any) => {
        prev.map((prod: any) => {
          if (prod.getProductById.data.id === e) {
            prod.quantity = prod.quantity * 1 + 1;
          }
        });
        return [...prev];
      });
      console.log("san pham da chon");
    }
  };
  /* ------------------ select inventory --------------- */

  const [inventories, setInventory] = useState([] as any);
<<<<<<< HEAD
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
=======
  useQuery(["getListInventory"], () => {
    const getListInventories = async () => {
      const listInventory = await getAllInventory();
      setInventory(listInventory.data.data);
      console.log(listInventory.data);
    };
    getListInventories();
  });
  const handleClickOptionSend = (e: number) => {
    setInventorySend(e);
  };
  const handleClickOptionReceive = (e: number) => {
    setInventoryReceive(e);
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7
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
        <div className="content-top">
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
                  {inventories.map((item: any) => (
                    <Select
                      style={{ width: "100%" }}
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </Select>
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
                  {inventories.map((item: any) => (
                    <Select
                      style={{ width: "100%" }}
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </Select>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="additional-information">
            <div className="title">
              <h3>Thông tin bổ sung</h3>
            </div>
            <div>
              <p>Ghi chú</p>
              <textarea
                rows={3}
                style={{ width: "100%" }}
                placeholder={"VD : Giao hàng nhanh"}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="background-export">
          <div className="title">
            <h3>Thông tin sản phẩm</h3>
          </div>
          <Select
            showSearch
            style={{ width: "70%" }}
            dropdownStyle={{ width: 1000 }}
            placeholder="Tìm kiếm sản phẩm"
            optionFilterProp="children"
            onSelect={handleClickOptionProduct}
            value=""
          >
            {product.map((item: any) => (
<<<<<<< HEAD
              <Select.Option
                style={{ width: 600 }}
                key={item.id}
                value={item.id}
              >
                {item.name}
              </Select.Option>
=======
              <Select style={{ width: "100%" }} key={item.id} value={item.id}>
                <div>
                  <div>{item.name}</div>
                  <div>Tồn : {item.salePrice} | Có thể bán : 10</div>
                </div>
              </Select>
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7
            ))}
          </Select>

          <Radio.Group value={"checkbox"}></Radio.Group>

          <Table
            rowKey="uid"
            columns={columns}
            dataSource={data}
            style={{ width: "100%" }}
          />
        </div>
<<<<<<< HEAD

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
=======
>>>>>>> 7ffea327db60f05eba478a5cf36f12888457b5d7
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
