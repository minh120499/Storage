import { Col, Row, Table, Button, Dropdown, Menu, MenuProps, Image, Input, Modal } from "antd";
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { deleteListProductVariant, getProductVariants } from "../../api/inventory";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IInventoryDto, IProductVariantDto, IResultId } from "../../interface";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import ToastCustom from "../../features/toast/Toast";



const InventoryManager = () => {
  const { Search } = Input;
  const { id } = useParams();
  const [inventory, setInventory] = useState({} as IInventoryDto);
  const [productvariant, setProductVariant] = useState<IProductVariantDto[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalproduct, settotalProduct] = useState<number>();
  const [detailproductvariant, setDetailProductVariant] = useState<IProductVariantDto>();
  const [status, setStatus] = useState(false);
  const [name, setName] = useState<string>('');




  useEffect(() => {
    getProductVariants(parseInt(id as string), name)
        .then(response => {
          setProductVariant(response.productVariants);
          setInventory(response.inventory);
          settotalProduct(response.totalProductVariant);
        })

  }, [status, name])

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (img: string) => {

        return (
            <Image width={45} src={img} />
        )
      }
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá nhập (đơn vị vnđ)",
      dataIndex: "importPrice",
      render: (Price: string) => (
          <NumberFormat value={Price} displayType='text' thousandSeparator={true} />
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "quantity",
      render: (quantity: string) => (
          <NumberFormat value={quantity} displayType='text' thousandSeparator={true} />
      ),
    },
    {
      title: "Ngày khởi tạo",
      dataIndex: "createAt",
      render: (createAt: any) => (
          <Moment format="DD/MM/YYYY HH:mm:ss">
            {createAt}
          </Moment>
      )
    },
    {
      render: (row: any) => (
          <DeleteIcon
              className="text-red-500"
              onClick={() => onDelete(row)}
          />
      ),
    }

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

  const onDelete = (row: any) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Thoát"
    }).then((result) => {
      if (result.isConfirmed) {
        const listId: number[] = [];
        listId.push(row.id)
        const idResult: IResultId = {
          idInventory: inventory.id,
          idProductVariant: listId
        }
        deleteListProductVariant(idResult).then(() => {
          ToastCustom.fire({
            icon: "success",
            title: "Xoá thành công!",
          }).then((r) => { });
          setStatus(!status);
          setSelectedRowKeys([]);
        })
      }
    });
  };

  const onDeleteList = async (listId: React.Key[]) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Thoát"
    }).then((result) => {
      if (result.isConfirmed) {
        const idResult: IResultId = {
          idInventory: inventory.id,
          idProductVariant: listId
        }
        deleteListProductVariant(idResult).then(() => {
          ToastCustom.fire({
            icon: "success",
            title: "Xoá thành công!",
          }).then((r) => { });
          setStatus(!status);
          setSelectedRowKeys([]);
        });
      }
    });
  };

  const handleMenuClick: MenuProps["onClick"] = (e: any) => {
    switch (e.key) {
      case "1":
        onDeleteList(selectedRowKeys);
    }
  };

  const menu = (
      <Menu
          onClick={handleMenuClick}
          items={[
            {

              label: <Link to="#">Xóa các phiên bản sản phẩm</Link>,
              key: "1",
              icon: <DeleteOutlined />,
              danger: true
            },
          ]}
      />
  );
  const handleSearch = (e: string) => {
    setName(e);
  }

  const showModal = (data: any) => {
    console.log(data);

    setDetailProductVariant(data);
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
      <div className="m-5">
        <h2>Quản lý kho</h2>
        <Row gutter={24}>
          <Col span={18}>
            <div className="block">
              <h1 style={{ color: "#1890FF" }}>Tất cả phiên bản sản phẩm</h1>
              <Search placeholder="Tìm kiếm theo tên sản phẩm" size="large" onSearch={(e) => handleSearch(e)} />
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px", marginBottom: "10px" }}>
                <Dropdown overlay={menu} disabled={!hasSelected}>
                  <Button type="primary" style={{ width: "180px", fontSize: "14px", marginLeft: "0px" }}>
                    Thao tác
                    <DownOutlined />
                  </Button>
                </Dropdown>
                <span style={{ marginLeft: 8, marginRight: 8 }}>
                {hasSelected ? `Đã chọn ${selectedRowKeys.length} phiên bản sản phẩm trên trang này` : ""}
              </span>
              </div>
              <Table
                  rowKey={"id"}
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  onRow={(record: any) => {
                    return {
                      onDoubleClick: () => {
                        showModal(record)
                      }
                    };
                  }}
              />
              <Modal
                  title= {<div style={{color: "#1890FF"}}>Chi tiết sản phẩm</div>}
                  visible={isModalVisible}
                  footer={null}
                  onCancel={handleCancel}
              >
                <Row gutter={12}>
                  <Col span={7}>
                    <p>Mã sản phẩm:</p>
                  </Col>
                  <Col span={5}>
                    <b style={{ textTransform: "uppercase" }}>{detailproductvariant?.code}</b>
                  </Col>

                  <Col span={7}>
                    <p>Tên sản phẩm:</p>
                  </Col>
                  <Col span={5}>
                    <b style={{ textTransform: "uppercase" }}>{detailproductvariant?.name}</b>
                  </Col>

                  <Col span={7}>
                    <p>Giá nhập (vnđ):</p>
                  </Col>
                  <Col span={5}>
                    <b style={{ textTransform: "uppercase" }}><NumberFormat value={detailproductvariant?.importPrice} displayType='text' thousandSeparator={true} /></b>
                  </Col>

                  <Col span={7}>
                    <p>Giá bán buôn (vnđ):</p>
                  </Col>
                  <Col span={5}>
                    <b style={{ textTransform: "uppercase" }}><NumberFormat value={detailproductvariant?.wholesalePrice} displayType='text' thousandSeparator={true} /></b>
                  </Col>

                  <Col span={7}>
                    <p>Giá bán lẻ (vnđ):</p>
                  </Col>
                  <Col span={5}>
                    <b style={{ textTransform: "uppercase" }}><NumberFormat value={detailproductvariant?.salePrice} displayType='text' thousandSeparator={true} /></b>
                  </Col>

                  <Col span={7}>
                    <p>Số lượng tồn kho:</p>
                  </Col>
                  <Col span={5}>
                    <b style={{ textTransform: "uppercase" }}><NumberFormat value={detailproductvariant?.quantity} displayType='text' thousandSeparator={true} /></b>
                  </Col>

                  <Col span={7}>
                    <p>Ngày khởi tạo:</p>
                  </Col>
                  <Col span={5}>
                    <b style={{ textTransform: "uppercase" }}>
                      <Moment format="DD/MM/YYYY HH:mm:ss">
                        {detailproductvariant?.createAt}
                      </Moment>
                    </b>
                  </Col>
                </Row>
              </Modal>
            </div>
          </Col>
          <Col span={6}>
            <div className="block">
              <h1 style={{ color: "#1890FF" }}>Thông tin kho</h1>
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
                    <p>Tổng tồn kho:</p>
                  </Col>
                  <Col span={16}>
                    <b style={{ textTransform: "uppercase" }}>
                      <NumberFormat value={totalproduct} displayType='text' thousandSeparator={true} />
                    </b>
                  </Col>

                  {/* <Col span={8}>
                    <p>Size:</p>
                  </Col>
                  <Col span={16}>
                    <b style={{ textTransform: "uppercase" }}>
                      <NumberFormat value={inventory.size} displayType='text' thousandSeparator={true} />
                    </b>
                  </Col> */}

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
                    <p>Thời gian sửa:</p>
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
      </div >
  );
};

export default InventoryManager;