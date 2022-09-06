import { Button, Form, Input, Modal } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import React, { useState } from "react";
import { findProductById } from "../../../api/product_variant";
import { DataType } from "../../type/data_type";
type prop = {
  products: any;
  setProducts: (value: any) => void;
  handleQuantity: (value: any) => void;
  dataProduct?: DataType[];
  quantityProducts: number;
};
export const ModalTable = ({
  products,
  setProducts,
  dataProduct,
  quantityProducts,
  handleQuantity,
}: prop) => {
  const [modal2Visible, setModal2Visible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns_modal: ColumnsType<DataType> = [
    {
      title: "Mã hàng",
      dataIndex: "code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: ["quantity", "id"],
      render: (a, text) => {
        return (
          <Input
            type={"number"}
            style={{ width: "50%" }}
            onChange={handleQuantity}
            id={text?.id + ""}
            key={text?.id}
            defaultValue={1}
            min={1}
            size={"middle"}
          />
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      const id = record.id;
      if (selected) {
        const isFound = products.findIndex(
          (element: any) => element.getProductById.id * 1 === id
        );
        const hanldeClick = async () => {
          const getProductById = await findProductById(id as any);
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
          console.log("san pham da chon");
        }
      } else {
        setProducts(
          selectedRows.map((e) => ({
            getProductById: e,
            quantity: 1,
          }))
        );
      }
    },
    onSelectAll(selected, selectedRows, changeRows) {
      setProducts(
        selectedRows.map((e) => ({
          getProductById: e,
          quantity: 1,
        }))
      );
    },
  };
  return (
    <div className="Modal">
      <Button type="primary" onClick={() => setModal2Visible(true)}>
        Chọn nhanh
      </Button>

      <Modal
        title="Chọn sản phẩm"
        centered
        visible={modal2Visible}
        onCancel={() => setModal2Visible(false)}
        footer={null}
      >
        <div className="select-modal">
          <Table
            rowKey="id"
            columns={columns_modal}
            dataSource={dataProduct}
            style={{ width: "100%" }}
            scroll={{ y: 240 }}
            rowSelection={rowSelection}
            pagination={false}
          />
        </div>
        <span style={{ color: "blue", fontWeight: 600 }}>
          Bạn đã chọn {quantityProducts} sản phẩm
        </span>
      </Modal>
    </div>
  );
};
