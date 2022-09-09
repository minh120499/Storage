/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Card,
  message,
  Modal,
  PageHeader,
  Space,
  Steps,
  Table,
  Tabs,
  Tag,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import "./file.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findDetailByExport } from "../../api/detail_export";

import {
  addExportByInventory,
  findExportById,
  importExportByInventory,
} from "../../api/export";
import {
  findExportStatusById,
  updateExportStatusById,
} from "../../api/export_status";
import { exportById, exportStatus, typeDetailExport } from "../type/data_type";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PDFStockTransfer from "./PDFStockTransfer";
import PrintIcon from "@mui/icons-material/Print";

export const Status = () => {
  const { id } = useParams();
  const [exportById, setExportById] = useState<exportById>({});
  const [detailExport, setDetailExport] = useState<typeDetailExport[]>([]);
  const [status, setStattus] = useState<exportStatus>({});
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const now = moment(new Date()).format("DD/MM/YYYY HH:mm").toString();
  const next = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(true);
    }, 500);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(async () => {
      if (status?.status === 0) {
        await updateExportStatusById(item, {
          id: status?.id,
          export: item,
          dateSend: now,
          status: 1,
        });
        await addExportByInventory(
            exportById?.exportInventory?.id,
            detailExport
        );
        message.success("Xuất phiếu chuyển hàng thành công");
      } else if (status?.status === 1) {
        await updateExportStatusById(item, {
          id: status?.id,
          export: item,
          dateReceive: now,
          status: 2,
        });
        await importExportByInventory(
            exportById?.receiveInventory?.id,
            detailExport
        );
        message.success("Nhận hàng thành công");
      }
      setIsModalOpen(false);
      setLoading(false);
      setCurrent(current + 1);
    }, 1000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleEdit = () => {
    setLoadingEdit(true);
    setTimeout(() => {
      setLoadingEdit(false);
      navigate(`/storage/stock_transfers/edit/${id}`);
    }, 500);
  };
  const data = async () => {
    const exportData = await findExportById(item);
    const detailExport = await findDetailByExport(item);
    const exportStatus = await findExportStatusById(item);
    setExportById(exportData);
    setDetailExport(detailExport);
    setStattus(exportStatus);

    setLoading(false);
    let b = 0;
    detailExport.map((e: any) => {
      b += e.quantity * 1;
    });
    setTotal(b);
    if (moment(exportStatus?.createAt).format("DD/MM/YYYY HH:mm") === now) {
      message.success("Thêm mới phiếu chuyển hàng thành công");
    }
  };
  useEffect(() => {
    data();
  }, [current]);
  console.log("Người tạo : " + status?.accountCreate)
  console.log("Mã phiếu : " + status?.code)
  console.log("Ngày tạo : " + status?.createAt)
  console.log("Ngày chuyển hàng : " + status?.dateSend)
  console.log("Ngày nhận hàng : " + status?.dateReceive)
  console.log("Chi nhánh chuyển :"+exportById?.exportInventory?.name)
  console.log("Chi nhánh nhận :"+exportById?.receiveInventory?.name)
  console.log(detailExport)

  const dataProductExport = detailExport;

  const columns: ColumnsType<typeDetailExport> = [
    {
      title: "Mã hàng",
      dataIndex: "productVariant",

      render: (text) => {
        return <div>{text?.code}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productVariant",

      render: (text) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: "Số lượng chuyển",
      dataIndex: "quantity",
    },
  ];
  if (status?.status === 2) {
    columns.push({
      title: "Số lượng nhận",
      dataIndex: "quantity",
    });
  }
  if (id === undefined) {
    return <div></div>;
  }
  const item = Number.parseInt(id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
      <div className='p-5'>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title="Quay lại tạo phiếu chuyển hàng"
              subTitle=""
              extra={[
                <Button key="3" danger hidden={status?.status === 2 ? true : false}>
                  Huỷ
                </Button>,
                <Button
                    key="2"
                    type="primary"
                    ghost
                    hidden={status?.status === 2 ? true : false}
                    onClick={handleEdit}
                    loading={loadingEdit}
                >
                  Sửa
                </Button>,
                <Button
                    key="1"
                    type="primary"
                    onClick={next}
                    hidden={status?.status === 2 ? true : false}
                    loading={loading}
                >
                  {status?.status === 1 ? "Nhận hàng" : "Chuyển hàng"}
                </Button>,
              ]}
          />
          <Modal
              title={
                status?.status === 0 ? (
                    <h4 style={{ fontWeight: 700 }}>Xuất phiếu chuyển hàng</h4>
                ) : (
                    <h4 style={{ fontWeight: 700 }}>Nhận hàng chuyển</h4>
                )
              }
              // open={isModalOpen}
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={"Xác nhận"}
              cancelText={"Thoát"}
              confirmLoading={loading}
          >
            {status?.status === 0 ? (
                <div>
                  {" "}
                  <div>
                    Thao tác này sẽ thay đổi thông số kho các sản phẩm trong phiếu
                    chuyển hàng:
                  </div>
                  <div>
                    <li>
                      {" "}
                      - Giảm tồn kho của chi nhánh{" "}
                      <span style={{ fontWeight: 700 }}>
                    {" "}
                        {exportById?.exportInventory?.name}{" "}
                  </span>
                    </li>
                    <li>
                      {" "}
                      - Tăng số lượng hàng đang về của chi nhánh{" "}
                      <span style={{ fontWeight: 700 }}>
                    {exportById?.receiveInventory?.name}
                  </span>
                    </li>
                  </div>
                  Bạn muốn xuất chuyển hàng phiếu chuyển này?{" "}
                </div>
            ) : (
                <div>
                  Thao tác nhận hàng này sẽ tăng số lượng tồn kho các sản phẩm trong
                  phiếu chuyển hàng của chi nhánh{" "}
                  <span style={{ fontWeight: 700 }}>
                {exportById?.receiveInventory?.name}
              </span>
                  . Thao tác này không thể khôi phục.
                </div>
            )}
          </Modal>
        </div>
        <div id="top-head-status" className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <b>{status?.code}</b>{" "}
              {status?.status === 0 ? (
                  <Tag className="rounded-3xl ml-3" color="blue">
                    Chờ chuyển
                  </Tag>
              ) : (
                  " "
              )}
              {status?.status === 1 ? (
                  <Tag className="rounded-3xl ml-3" color="warning">
                    Đang chuyển
                  </Tag>
              ) : (
                  " "
              )}
              {status?.status === 2 ? (
                  <Tag className="rounded-3xl ml-3" color="green">
                    Nhận hàng
                  </Tag>
              ) : (
                  " "
              )}
            </div>
            <div>
              <Space size="small">
                {
                  (exportById !== undefined && detailExport.length > 0 && status !== undefined) ? (
                      <PDFDownloadLink
                          fileName={"phieuTraHang - " + moment(status.createAt).format('DD/MM/YYYY HH:mm:ss aa') + ".pdf"}
                          document={<PDFStockTransfer statusExport={status}  anExport={exportById}
                                                      detailExport={detailExport} />}>
                        {({blob, url, loading, error}) =>
                            <Button style={{padding:0,paddingLeft: 5,paddingRight: 5}} type='default'> <Space>
                              <PrintIcon style={{position: 'relative', top: 3,fontSize:16}}/>
                              In phiếu
                            </Space></Button>
                        }
                      </PDFDownloadLink>
                  ):<></>
                }
                <Button>Sao chép</Button>

              </Space>
            </div>
          </div>

          <div>
            <Steps
                current={status?.status}
                size="small"
                labelPlacement="vertical"
            >
              <Steps.Step
                  title="Chờ chuyển"
                  description={moment(status?.createAt).format("DD/MM/YYYY HH:mm")}
              />
              <Steps.Step
                  title="Đang chuyển"
                  description={status?.dateSend ? status?.dateSend : " "}
              />
              <Steps.Step
                  title="Nhận hàng"
                  description={status?.dateReceive ? status?.dateReceive : " "}
              />
            </Steps>
          </div>
        </div>

        <div id="status-main" className="mt-5">
          <div className="grid grid-cols-6 gap-5">
            <Card
                className="col-span-4"
                title="Thông tin phiếu"
                extra={
                  <a href="#" onClick={showModal}>
                    Xem lịch sử phiếu hàng
                  </a>
                }
            >
              <Modal
                  title="Lịch sử thao tác phiếu chuyển hàng"
                  visible={visible}
                  onCancel={hideModal}
                  footer={null}
                  style={{ width: "50%" }}
              >
                <table>
                  <tr>
                    <th>Người thao tác</th>
                    <th>Chức năng</th>
                    <th>Thao tác</th>
                    <th>Thời gian</th>
                  </tr>
                  {status?.status === 0 ? (
                      <tr>
                        <td className="">{status?.accountCreate}</td>
                        <td className="">Chuyển hàng</td>
                        <td className="">Thêm mới phiếu chuyển hàng</td>
                        <td className="">
                          {moment(status?.createAt).format("DD/MM/YYYY HH:mm")}
                        </td>
                      </tr>
                  ) : (
                      " "
                  )}
                  {status?.status === 1 ? (
                      <>
                        <tr>
                          <td className="">{status?.accountCreate}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Thêm mới phiếu chuyển hàng</td>
                          <td className="">
                            {moment(status?.createAt).format("DD/MM/YYYY HH:mm")}
                          </td>
                        </tr>
                        <tr>
                          <td className="">{status?.accountSend}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">{status?.dateSend}</td>
                        </tr>
                      </>
                  ) : (
                      " "
                  )}
                  {status?.status === 2 ? (
                      <>
                        <tr>
                          <td className="">{status?.accountCreate}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Thêm mới phiếu chuyển hàng</td>
                          <td className="">
                            {moment(status?.createAt).format("DD/MM/YYYY HH:mm")}
                          </td>
                        </tr>
                        <tr>
                          <td className="">{status?.accountSend}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">{status?.dateSend}</td>
                        </tr>
                        <tr>
                          <td className="">{status?.accountReceive}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Nhận hàng</td>
                          <td className="">{status?.dateReceive}</td>
                        </tr>
                      </>
                  ) : (
                      " "
                  )}
                </table>
              </Modal>
              <p>Chi nhánh chuyển : {exportById?.exportInventory?.name}</p>
              <p>
                Ngày tạo phiếu :{" "}
                {moment(status?.createAt).format("DD/MM/YYYY HH:mm")}
              </p>
              <p>Chi nhánh nhận : {exportById?.receiveInventory?.name}</p>
              <p>Người tạo : {status?.accountCreate}</p>
            </Card>
            <Card title="Thông tin bổ sung" className="col-span-2">
              <h4>Ghi chú</h4>
              <p>Chưa có ghi chú</p>
              {/* <p>Card content</p>
            <p>Card content</p> */}
            </Card>
          </div>
        </div>

        <div >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
                tab="Thông tin sản phẩm"
                key="1"
                style={{ backgroundColor: "while" }}
            >
              <Table
                  rowKey="uid"
                  columns={columns}
                  dataSource={dataProductExport}
                  loading={loading}
                  pagination={false}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div className="export-bottom ">
          <li className="">
            <div className="">
              <span>Tổng số lượng chuyển ({detailExport.length} sản phẩm) :</span>
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
  );
};
