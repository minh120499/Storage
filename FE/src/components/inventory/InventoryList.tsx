import { Table, Button, EditIcon, Lock, UnLock } from "../../UI";
import type { ColumnsType } from "antd/es/table";
import { IInventory } from "../../interface";
import {
  Space,
  Modal,
  Form,
  Input,
  Tag,
  Progress,
  Tooltip,
  Col,
  Row,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import {
  createInventory,
  updateInvetory,
  deleteInvetory,
  getPagination,
} from "../../api/inventory";
import React, { useEffect, useState } from "react";
import AddAddress from "../AddAddress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import FilterBox from "../../UI/FilterBox";

const InventoryList = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<IInventory> = [
    {
      title: <b>Id</b>,
      dataIndex: "inventory",
      key: "id",
      render: (inventory: IInventory) => {
        return <div>{inventory?.id}</div>;
      },
      sorter: (a: IInventory, b: IInventory) => (a?.id || 1) - (b?.id || 0),
    },
    {
      title: <b>Mã kho</b>,
      dataIndex: "inventory",
      key: "code",
      sorter: (a: IInventory, b: IInventory) => a.code.localeCompare(b.code),
      render: (inventory: IInventory) => (
        <div className="bg-red">{inventory.code}</div>
      ),
    },
    {
      title: <b>Tên</b>,
      dataIndex: "inventory",
      key: "name",
      sorter: (a: IInventory, b: IInventory) => a.name.localeCompare(b.name),
      render: (inventory: IInventory) => (
        <div className="bg-red">{inventory.name}</div>
      ),
    },
    {
      title: <b>Địa chỉ</b>,
      dataIndex: "inventory",
      key: "address",
      render: (inventory: IInventory) => (
        <div className="bg-red">{inventory.address}</div>
      ),
    },
    {
      title: <b>Tồn kho</b>,
      dataIndex: ["totalProductVariant", "inventory"],
      key: "stock",
      render: (_: any, record: any) => {
        const size = record?.inventory?.size || 1000;
        const stock = record?.totalProductVariant || 8293509032;
        const percent = size ? Math.round((stock / size) * 100) : 0;
        const color = percent > 70 ? "red" : percent > 40 ? "blue" : "green";

        return (
          <Tooltip
            title={`${stock.toLocaleString()} / ${size.toLocaleString()}`}
          >
            <div>
              {Intl.NumberFormat("en", { notation: "compact" }).format(stock) +
                " / " +
                Intl.NumberFormat("en", { notation: "compact" }).format(size)}
            </div>
            <Progress
              style={{ width: 130 }}
              strokeColor={color}
              percent={percent}
              format={(percent) => {
                if (percent && percent >= 100) {
                  return <div style={{ color: "red" }}>Full</div>;
                } else {
                  return <div>{percent || 0} %</div>;
                }
              }}
            />
          </Tooltip>
        );
      },
    },
    {
      title: <b>Trạng thái</b>,
      dataIndex: "inventory",
      key: "isDelete",
      render: (inventory: IInventory) => {
        return inventory?.isDelete ? (
          <Tag
            style={{ borderRadius: "15px", padding: "3px 10px" }}
            color={`rgb(246 76 114)`}
          >
            Ngừng hoạt động
          </Tag>
        ) : (
          <Tag
            style={{ borderRadius: "15px", padding: "3px 10px" }}
            color={"green" || `rgb(159 237 207)`}
          >
            Đang hoạt động
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "inventory",
      key: "action",
      render: (record: any) => {
        return (
          <Space size="middle">
            <EditIcon
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setMode("edit");
                updateInventory(record);
                setIsModalVisible(true);
              }}
            >
              Sửa
            </EditIcon>
            {record?.status ? (
              <Lock
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  deleteInvetoryHandler(record, "mở khóa");
                }}
              />
            ) : (
              <UnLock
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  deleteInvetoryHandler(record, "ngừng hoạt động");
                }}
              />
            )}
          </Space>
        );
      },
    },
  ];

  const inventoryMutation = useMutation((inventory: IInventory) =>
    createInventory(inventory)
  );
  const inventoriesUpdate = useMutation((inventory: any) =>
    updateInvetory(inventory.data, inventory.id)
  );
  const inventoriesDelete = useMutation((id: number) => deleteInvetory(id));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullAddress, setFullAddress] = useState("");
  const [keyChange, setKeyChange] = useState(0);
  const [formInventory] = Form.useForm();
  const [mode, setMode] = useState("new");

  useEffect(() => {
    document.title = "Kho hàng";
  }, []);

  const handleOk = () => {
    const { code, name, detailsAddress, id } = formInventory.getFieldsValue();
    formInventory.resetFields([
      "code",
      "name",
      "address",
      "detailsAddress",
      "province",
      "district",
    ]);
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
    formInventory.resetFields(["code", "name", "address"]);
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

  const deleteInvetoryHandler = (record: any, text: string) => {
    Swal.fire({
      icon: "question",
      title: "Thay đổi trạng thái",
      html: `Xác nhận ${text} kho ${record?.code}`,
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
      <Row>
        <Col span={4}>
          <Button
            onClick={() => {
              setIsModalVisible(true);
              setMode("new");
            }}
          >
            <PlusOutlined /> Tạo mới kho
          </Button>
        </Col>
        <Col span={20}>
          <FilterBox />
        </Col>
      </Row>

      <Table
        columns={columns}
        query={getPagination}
        rowKey={Math.random().toString()}
        onRow={(record: any) => {
          return {
            onClick: () =>
              navigate(`${record?.inventory?.id}`, { replace: true }),
          };
        }}
      />
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        title={mode === "new" ? "Tạo Kho mới" : "Sửa thông tin kho"}
        footer={
          <div>
            <Space size="small">
              <Button onClick={handleOk} key="submit">
                {mode === "new" ? "Tạo" : "Cập nhập"}
              </Button>
              <Button onClick={handleCancel} key="back" mode="cancel">
                Hủy
              </Button>
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
    </div>
  );
};

export default InventoryList;
