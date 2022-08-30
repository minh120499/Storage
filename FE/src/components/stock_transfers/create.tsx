/* eslint-disable array-callback-return */
import { Select, Form, Popconfirm, Modal, Input } from "antd";
import React, { useEffect, useState } from "react";
import { findProductById, getProducts } from "../../api/product_variant";
import "./file.css";
import { getAllInventory } from "../../api/inventory";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { createExport } from "../../api/export";
import { creatDetailExport } from "../../api/detail_export";
import { Button } from "antd";
import { DataType } from "../type/data_type";
import { DeleteTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ModalTable } from "./create/modal_table";
import { SelectInventory } from "./create/select_inventory";

const Create: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [inventorySend, setInventorySend] = useState<number>();
  const [inventoryReceive, setInventoryReceive] = useState<number>();
  const [exportId, setExportId] = useState<number | undefined>();
  const navigate = useNavigate();
  const exportValue = {
    exportInventory: inventorySend,
    receiveInventory: inventoryReceive,
  };

  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    let b = 0;
    products.map((e: any) => {
      b += e.quantity * 1;
    });
    setTotal(b);
    setQuantityProducts(products.length);
  }, [products]);
  const handleDelete = (e: any) => {
    const newData = products.filter(
      (item: any) => item.getProductById.id * 1 !== e * 1
    );
    setProducts(newData);
  };
  const handleQuantity = (e: any) => {
    const quantity = e.target.value;
    const id = e.target.id * 1;
    setProducts((prev: any) => {
      prev.map((prod: any) => {
        if (prod.getProductById.id === id) {
          prod.quantity = quantity * 1;
        }
      });
      return [...prev];
    });
  };
  const data: DataType[] = products;

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã hàng",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.code}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: ["quantity", "getProductById"],
      render: (a, text) => {
        return (
          <Input
            type={"number"}
            style={{ width: "50%" }}
            onChange={handleQuantity}
            id={text?.getProductById.id}
            key={text?.getProductById.id}
            value={text.quantity}
            min={1}
            size={"middle"}
          />
        );
      },
    },
    {
      dataIndex: ["getProductById"],
      render: (text) => {
        return (
          <Popconfirm
            id={text?.id}
            key={text?.id}
            title="Chắc chắn xoá ?"
            onConfirm={() => handleDelete(text?.id)}
            okText={"Ok"}
            cancelText={"No"}
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      },
    },
  ];
  const [quantityProducts, setQuantityProducts] = useState<number>(0);

  const handleClickOptionProduct = (e: any) => {
    const id = e[1] * 1;
    const isFound = products.findIndex(
      (element: any) => element.getProductById.id === id
    );
    const hanldeClick = async () => {
      const getProductById = await findProductById(id);
      setProducts([
        {
          getProductById: getProductById,
          quantity: 1,
        },
        ...products,
      ]);
    };
    if (isFound < 0) {
      hanldeClick();
    } else {
      setProducts((prev: any) => {
        prev.map((prod: any) => {
          if (prod.getProductById.id === id) {
            prod.quantity = prod.quantity * 1 + 1;
          }
        });
        return [...prev];
      });
    }
  };
  const allQueries = useQueries({
    queries: [
      {
        queryKey: ["id"],
        queryFn: (): Promise<DataType[]> => getProducts(),
      },
      {
        queryKey: ["id1"],
        queryFn: () => getAllInventory(),
      },
    ],
  });

  const dataProduct = allQueries[0].data;

  const handleSubmit = async () => {
    const saveExport = await createExport(exportValue);
    const exportId = saveExport.data.id;
    setExportId(exportId);
    const detailExport = products.map((e: any) => {
      return {
        productVariant: e.getProductById.id,
        quantity: e.quantity,
        export: exportId,
      };
    });
    creatDetailExportSubmit.mutate(detailExport);
  };

  const creatDetailExportSubmit = useMutation((item: any) =>
    creatDetailExport(item)
  );
  const handleStatus = (id?: number) => {
    navigate(`/storage/stock_transfers/${id}`);
  };
  creatDetailExportSubmit.isSuccess
    ? handleStatus(exportId)
    : console.log(false);
  return (
    <>
      <div className="content">
        <div className="content-top">
          <SelectInventory
            setInventorySend={(e) => setInventorySend(e)}
            setInventoryReceive={(e) => setInventoryReceive(e)}
            listInventory={allQueries[1]}
          />
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
          <div className="menu">
            <div className="menu-select">
              <Select
                showSearch
                style={{ width: "100%" }}
                dropdownStyle={{ width: 1000 }}
                placeholder="Tìm kiếm sản phẩm"
                onSelect={handleClickOptionProduct}
              >
                {allQueries[0].data &&
                  allQueries[0].data.map((item: DataType) => (
                    <Select.Option
                      value={[item.name, item.id]}
                      style={{ width: "100%" }}
                      key={item.id}
                    >
                      <div>
                        <div>{item.name}</div>
                        <div>Tồn : {item.stock} | Có thể bán : 10</div>
                      </div>
                    </Select.Option>
                  ))}
              </Select>
            </div>
            <ModalTable
              products={products}
              setProducts={(e) => setProducts(e)}
              dataProduct={dataProduct}
              quantityProducts={quantityProducts}
              handleQuantity={(e) => handleQuantity(e)}
            />
          </div>
          <div>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={data}
              style={{
                width: "100%",
              }}
              scroll={{ y: 240 }}
              pagination={false}
            />
          </div>
          <div className="export-bottom">
            <li className="">
              <div className="">
                <span>
                  Tổng số lượng chuyển ({quantityProducts} sản phẩm) :
                </span>
              </div>
              <div className="">
                <span>{total}</span>
              </div>
            </li>
            <li>
              <div className="">
                <span>Tổng giá trị chuyển : {total}</span>
              </div>
            </li>
          </div>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Lưu
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default Create;
