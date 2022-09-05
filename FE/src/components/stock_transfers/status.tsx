/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Modal,
  PageHeader,
  Space,
  Spin,
  Steps,
  Table,
  Tabs,
  Tag,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import "./file.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findDetailByExport } from "../../api/detail_export";
import { findExportById } from "../../api/export";
import {
  findExportStatusById,
  updateExportStatusById,
} from "../../api/export_status";
import { exportById, exportStatus, typeDetailExport } from "../type/data_type";

export const Status = () => {
  const { id } = useParams();
  const [exportById, setExportById] = useState<exportById>();
  const [detailExport, setDetailExport] = useState<typeDetailExport[]>([]);
  const [status, setStattus] = useState<exportStatus>();
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  const now = moment(new Date()).format("DD/MM/YYYY HH:mm").toString();
  const next = async () => {
    if (status?.status === 0) {
      await updateExportStatusById(item, {
        id: status?.id,
        export: item,
        dateSend: now,
        status: 1,
      });
    } else if (status?.status === 1) {
      await updateExportStatusById(item, {
        id: status?.id,
        export: item,
        dateReceive: now,
        status: 2,
      });
    }
    setCurrent(current + 1);
  };
  const data = async () => {
    const exportData = await findExportById(item);
    const detailExport = await findDetailByExport(item);
    const exportStatus = await findExportStatusById(item);
    setExportById(exportData);
    // @ts-ignore
    setDetailExport(detailExport);
    setStattus(exportStatus);
    setLoading(false);
  };
  useEffect(() => {
    data();
  }, [current]);

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
      title: "Số lượng",
      dataIndex: "quantity",
    },
  ];

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
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Quay lại tạo phiếu chuyển hàng"
          subTitle=""
          extra={[
            <Button key="3" hidden={status?.status === 2 ? true : false}>
              Huỷ
            </Button>,
            <Button key="2" hidden={status?.status === 2 ? true : false}>
              Sửa
            </Button>,
            <Button
              key="1"
              type="primary"
              onClick={next}
              hidden={status?.status === 2 ? true : false}
            >
              {status?.status === 1 ? "Nhận hàng" : "Chuyển hàng"}
            </Button>,
          ]}
        />
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
              <Button>In phiếu</Button>
              <Button>Sao chép</Button>
              {/* <Button>In phiếu</Button> */}
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

      <div>
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
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};
