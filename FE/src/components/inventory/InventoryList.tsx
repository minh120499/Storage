import { Table, Button, EditIcon, DeletedIcon } from "../../UI";
import type { ColumnsType } from "antd/es/table";
import { IInventory } from "../../interface";
import { Space, Modal, Form, Input, Tag } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createInventory,
  updateInvetory,
  deleteInvetory,
  getPagination,
} from "../../api/inventory";
import {useEffect, useState} from "react";
import AddAddress from "../AddAddress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";

const InventoryList = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<IInventory> = [
    {
      title: <b>Id</b>,
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => (a?.id || 1) - (b?.id || 0),
    },
    {
      title: <b>Mã kho</b>,
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: <b>Tên</b>,
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: <b>Địa chỉ</b>,
      dataIndex: "address",
      key: "address",
    },
    {
      title: <b>Trạng thái</b>,
      dataIndex: "isDelete",
      key: "isDelete",
      render: (status: boolean) => {
        return status ? (
            <Tag
                style={{ borderRadius: "15px" }}
                color={"volcano" || `rgb(246 76 114)`}
            >
              Ngừng hoạt động
            </Tag>
        ) : (
            <Tag
                style={{ borderRadius: "15px" }}
                color={"green" || `rgb(159 237 207)`}
            >
              Đang hoạt động
            </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
          <Space size="middle">
            <EditIcon
                onClick={() => {
                  setMode("edit");
                  updateInventory(record);
                  setIsModalVisible(true);
                }}
            >
              Sửa
            </EditIcon>
            <DeletedIcon
                mode="cancel"
                onClick={() => deleteInvetoryHandler(record)}
            >
              Xóa
            </DeletedIcon>
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

  // const inventories = useQuery(["id"], getPagination, { retry: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullAddress, setFullAddress] = useState("");
  const [keyChange, setKeyChange] = useState(0);
  const [formInventory] = Form.useForm();
  const [mode, setMode] = useState("new");

  useEffect(() =>{
    document.title= "Kho hàng"
  },[])

  const handleOk = () => {
    const { code, name, detailsAddress, id } = formInventory.getFieldsValue();
    formInventory.resetFields(["code","name","address", "detailsAddress", "province", "district"]);
    const payload = {
      data: {
        code,
        name,
        address: detailsAddress + fullAddress,
      },
      id: id,
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
    formInventory.resetFields(["code","name","address"]);
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
      title: "Thay đổi trạng thái",
      html: `Xác nhận thay đổi trạng thái kho ${record?.code}`,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((e: any) => {
      if (e.isConfirmed) {
        inventoriesDelete.mutate(record?.id || 0);
        Swal.fire("Thành công!", "Đã thay đổi thành công", "success");
      }
    });
    setIsModalVisible(false);
  };
  return (
      <div className="p-5">
        <Button
            onClick={() => {
              setIsModalVisible(true);
              setMode("new");
            }}
        >
          <PlusOutlined /> Tạo mới kho
        </Button>
        <Table
            columns={columns}
            onRow={(record: any) => {
              return {
                onDoubleClick: () =>
                    navigate({ pathname: `/stocker/inventories/${record.id}` }),
              };
            }}
            query={getPagination}
            rowKey="id"
            // total={20}
        />
        {isModalVisible && (
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                title={mode === "new" ? "Tạo Kho mới" : "Sửa thông tin kho"}
                footer={
                  <div>
                    <Space size="small">
                      <Button onClick={handleOk} key="submit">{mode === "new" ? "Tạo" : "Cập nhập"}</Button>
                      <Button onClick={handleCancel} key="back" mode="cancel">Hủy</Button>
                    </Space>
                  </div>
                }
            >
              <Form form={formInventory}>
                <Form.Item name="id" style={{ display: "none" }}>
                  <Input />
                </Form.Item>
                <Form.Item
                    label="Mã kho"
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
                    label="Tên kho"
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
      </div>
  );
};

export default InventoryList;
