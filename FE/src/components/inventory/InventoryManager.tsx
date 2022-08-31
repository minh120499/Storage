import { Avatar, Col, Form, Row, Select, Table, Button } from "antd";
import {LeftOutlined}  from "@ant-design/icons";
import type { SelectProps } from "antd";
// import Table from "../../UI/Table";
import { getProductVariants } from "../../api/inventory";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IInventoryDto, IProductVariantDto } from "../../interface";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

const storages: SelectProps["options"] = [
  {
    label: "Hà Nội",
    value: "Hà Nội",
  },
  {
    label: "Hồ Chí Minh",
    value: "Hồ Chí Minh",
  },
];

const InventoryManager = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({} as IInventoryDto);
  const [productvariant, setProductVariant] = useState<IProductVariantDto[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [totalproduct, settotalProduct] = useState<number>();


  useEffect(() => {
    getProductVariants(parseInt(id as string))
      .then(response => {
        setProductVariant(response.productVariants);
        setInventory(response.inventory);
        settotalProduct(response.totalProductVariant);
      })

  }, [])

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (img: string) => {

        return (
          <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }} src={img}></Avatar>
        )
      }
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá nhập",
      dataIndex: "importPrice",
      render: (text: any) => (
        <NumberFormat value={text} displayType='text' thousandSeparator={true} />
      ),
    },
    {
      title: "Trong kho",
      dataIndex: "quantity",
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0;

  const data: IProductVariantDto[] = productvariant;

  return (
    <div>
      <h2>
      <Link to="/stocker/inventories">
      <LeftOutlined /> Danh sách kho
      </Link>
      </h2>
      <Row gutter={24}>
        <Col span={18}>
          <div className="block">
            <h1>Sản phẩm</h1>
            <Table
              rowKey={"id"}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="block">
            <h1>Thông tin kho</h1>
            <form>
              <Row gutter={24}>
                <Col span={8}>
                  <p>Mã kho:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{inventory.code}</b>
                </Col>

                <Col span={8}>
                  <p>Tên kho:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{inventory.name}</b>
                </Col>

                <Col span={8}>
                  <p>Tổng số lượng sản phẩm:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{totalproduct}</b>
                </Col>

                <Col span={8}>
                  <p>Size:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{inventory.size}</b>
                </Col>

                <Col span={8}>
                  <p>Địa chỉ:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{inventory.address}</b>
                </Col>

                <Col span={8}>
                  <p>Thời gian tạo:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                      {inventory.createAt}
                    </Moment>
                  </b>
                </Col>

                <Col span={8}>
                  <p>thời gian sửa:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                      {inventory.updateAt}
                    </Moment>
                  </b>
                </Col>

              </Row>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InventoryManager;
