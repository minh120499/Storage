import { Table, Button } from "../../UI";
import type { ColumnsType } from "antd/es/table";
import { IInventory } from "../../interface";
import { Space, Modal, Form, Input } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createInventory,
  getAllInventory,
  updateInvetory,
  deleteInvetory,
} from "../../api/inventory";
import { useState } from "react";
import AddAddress from "../AddAddress";
import Swal from "sweetalert2";

const InventoryList = () => {
  const columns: ColumnsType<IInventory> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "isDelete",
      key: "isDelete",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setMode("edit");
              updateInventory(record);
              setIsModalVisible(true);
            }}
          >
            Sửa
          </Button>
          <Button mode="cancel" onClick={() => deleteInvetoryHandler(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const inventoryMutation = useMutation((inventory: IInventory) =>
    createInventory(inventory)
  );
  const inventoriesUpdate = useMutation((inventory: any) =>
    updateInvetory(inventory.data, inventory.id)
  );
  const inventoriesDelete = useMutation((id: number) => deleteInvetory(id));

  const inventories = useQuery(["id"], getAllInventory, { retry: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullAddress, setFullAddress] = useState("");
  const [keyChange, setKeyChange] = useState(0);
  const [formInventory] = Form.useForm();
  const [mode, setMode] = useState("new");

  const handleOk = () => {
    const { code, name, detailsAddress } = formInventory.getFieldsValue();
    console.log(detailsAddress + fullAddress);
    const payload = {
      data: {
        code,
        name,
        address: detailsAddress + fullAddress,
      },
      id: 1,
    };

    if (mode === "new") {
      inventoryMutation.mutate(payload.data);
    } else {
      inventoriesUpdate.mutate(payload);
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setKeyChange(0);
    setIsModalVisible(false);
  };

  const updateInventory = (e: any) => {
    const fullAddress = e.address.split(",");
    formInventory.setFieldsValue({
      code: e.code,
      name: e.name,
      detailsAddress: fullAddress[0],
      id: e.id,
      province: fullAddress[1],
      district: fullAddress[2],
      ward: fullAddress[3],
    });
  };

  const deleteInvetoryHandler = (record: any) => {
    Swal.fire({
      icon: "question",
      title: "Xác nhận xóa",
      html: `Xác nhậm xóa kho ${record?.code}`,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((e: any) => {
      if (e.isConfirmed) {
        inventoriesDelete.mutate(record?.id || 0);
        Swal.fire("Đã xóa!", "Đã xóa thành công", "success");
      }
    });
    setIsModalVisible(false)
  };
  return (
    <>
      <Button
        onClick={() => {
          setIsModalVisible(true);
          setMode("new");
        }}
      >
        Add
      </Button>
      <Table columns={columns} query={inventories} rowKey="id" total={10} />
      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          title={mode === "new" ? "Tạo Kho mới" : "Sửa thông tin kho"}
          footer={
            <div>
              <Space size="small">
                <Button>{mode === "new" ? "Tạo" : "Cập nhập"}</Button>
                <Button mode="cancel">Hủy</Button>
              </Space>
            </div>
          }
        >
          <Form form={formInventory}>
            <Form.Item name="id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Code"
              name="code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <AddAddress onChange={setFullAddress} keyChange={keyChange} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default InventoryList;
