/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react-hooks/rules-of-hooks */
import { blue } from "@mui/material/colors";
import { Button, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findDetailByExport, getDetailExport } from "../../api/detail_export";
import { getExport } from "../../api/export";
import { findExportStatusById, getExportStatus } from "../../api/export_status";
import { exportById, listExport, typeDetailExport } from "../type/data_type";

export const ListExport = () => {
  const [listExport, setListExport] = useState<listExport[]>([]);
  const [loading, setLoading] = useState(true);
  const data = async () => {
    const exportData = await getExport();

    exportData.data.map(async (e: exportById) => {
      const detailExport = await findDetailByExport(e.id);
      const exportStatus = await findExportStatusById(e.id);
      setListExport((pre: listExport[]) => {
        return [
          ...pre,
          {
            exportById: e,
            typeDetailExport: detailExport,
            exportStatus: exportStatus,
          },
        ];
      });
    });

    setLoading(false);
  };
  useEffect(() => {
    setListExport([]);
    data();
  }, []);
  // console.log(listExport);
  const columns: ColumnsType<listExport> = [
    {
      title: "Ngày tạo",
      dataIndex: "exportStatus",
      key: "exportStatus",
      render: (text) => {
        // console.log(text);
        return <div>{moment(text?.createAt).format("DD/MM/YYYY HH:mm")}</div>;
      },
    },
    {
      title: "Mã phiếu",
      dataIndex: "exportStatus",
      key: "exportStatus",
      render: (text) => {
        // console.log(text);
        return <a>{text.code}</a>;
      },
    },
    {
      title: "Chi nhánh chuyển",
      dataIndex: "exportById",
      key: "exportById",
      render: (text) => {
        return <div>{text?.exportInventory?.name}</div>;
      },
    },
    {
      title: "Chi nhánh nhận",
      dataIndex: "exportById",
      key: "exportById",
      render: (text) => {
        return <div>{text?.receiveInventory?.name}</div>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "exportStatus",
      key: "exportStatus",
      render: (text) => {
        return (
          <div>
            {text.status === 0 ? (
              <Tag color={"blue"} key={text.status}>
                Chờ chuyển
              </Tag>
            ) : "" || text.status === 1 ? (
              <Tag color={"warning"} key={text.status}>
                Đang chuyển
              </Tag>
            ) : "" || text.status === 2 ? (
              <Tag color={"green"} key={text.status}>
                Đã nhận
              </Tag>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    // },
  ];
  // columns.push({
  //   title: "Ngày chuyển",
  //   dataIndex: "exportStatus",
  //   key: "exportStatus",
  //   render: (text) => {
  //     return <div>{moment(text?.dateSend).format("DD/MM/YYYY HH:mm")}</div>;
  //   },
  // });

  const dataA: listExport[] = listExport;
  const navigate = useNavigate();

  const hanldeClick = () => {
    navigate(`/storage/stock_transfers/create`);
  };
  const hanldeRow = (e: any) => {
    navigate(`/storage/stock_transfers/${e.id}`);
  };
  return (
    <>
      <Button onClick={hanldeClick} type="primary">
        + Tạo phiếu chuyển hàng
      </Button>
      <Table
        rowKey={"uid"}
        columns={columns}
        dataSource={dataA}
        loading={loading}
        onRow={(record, index) => {
          return {
            onClick: () => hanldeRow(record?.exportById),
          };
        }}
      />
    </>
  );
};
