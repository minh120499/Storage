import {
  Button,
  Modal,
  Pagination,
  PaginationProps,
  Table,
  Tag,
  Transfer,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findDetailByExport } from "../../api/detail_export";
import { getExport } from "../../api/export";
import { findExportStatusById } from "../../api/export_status";
import { exportById, listExport } from "../type/data_type";
import SettingsIcon from "@mui/icons-material/Settings";

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

export const ListExport = () => {
  const COLUMS: ColumnsType<listExport> = [
    {
      title: (
          <SettingsIcon
              onClick={() => {
                setColSettingModal(true);
              }}
          />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "exportStatus",
      key: "exportStatus",
      render: (text) => {
        return <div>{moment(text?.createAt).format("DD/MM/YYYY HH:mm")}</div>;
      },
    },
    {
      title: "Mã phiếu",
      dataIndex: "exportStatus",
      key: "exportStatus",
      render: (text) => {
        return <div>{text.code}</div>;
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
    {
      title: "Ngày nhận",
      dataIndex: "exportStatus",
      key: "exportStatus",
      render: (text) => {
        return <div>{text?.dateReceive}</div>;
      },
    },
  ];
  const [columns, setColumns] = useState<ColumnsType<listExport>>([
    {
      title: (
          <SettingsIcon
              onClick={() => {
                setColSettingModal(true);
              }}
          />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "exportStatus",
      key: "exportStatus",
      render: (text) => {
        return <div>{moment(text?.createAt).format("DD/MM/YYYY HH:mm")}</div>;
      },
    },
    {
      title: "Mã phiếu",
      dataIndex: "exportStatus",
      key: "exportStatus",
      render: (text) => {
        return <div>{text.code}</div>;
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
                  <Tag color={"blue"} style={{padding: "5px"}} key={text.status}>
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
  ]);
  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([
    "Ngày tạo",
    "Mã phiếu",
    "Chi nhánh chuyển",
    "Chi nhánh nhận",
    "Trạng thái",
  ]);
  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 1; i < COLUMS.length; i++) {
      const data = {
        key: COLUMS[i].title?.toString() || "",
        title: COLUMS[i].title?.toString() || "",
        description: COLUMS[i].title?.toString() || "",
        chosen: targetKeys.includes(COLUMS[i].title?.toString() || ''),
        disabled: COLUMS[i].title?.toString() === "Mã phiếu",
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
    document.title= "Đơn chuyển hàng"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (newTargetKeys: string[]) => {
    const c = COLUMS.filter((c) => {
      if (c.title?.toString() === undefined) {
        return c;
      } else {
        return newTargetKeys.includes(c.title?.toString()) ? c : "";
      }
    });
    c.unshift(COLUMS[0]);
    setColumns(c);
    setTargetKeys(newTargetKeys);
  };

  //
  const [listExport, setListExport] = useState<listExport[]>([]);
  const [loading, setLoading] = useState(true);
  const [colSettingModal, setColSettingModal] = useState(false);
  const [total, setTotal] = useState();
  const [current, setCurrent] = useState(1);
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  const data = async () => {
    // @ts-ignore
    const exportData = await getExport(current);

    exportData.data.map(async (e: exportById) => {
      const detailExport = await findDetailByExport(e.id);
      const exportStatus = await findExportStatusById(e.id);
      // @ts-ignore
      setListExport((pre: listExport[]) => {
        return [
          {
            exportById: e,
            typeDetailExport: detailExport,
            exportStatus: exportStatus,
          },
          ...pre,
        ];
      });
    });
    setTotal(exportData.total);
    setLoading(false);
  };
  useEffect(() => {
    setListExport([]);
    data();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const dataA: listExport[] = listExport;
  const navigate = useNavigate();

  const hanldeClick = () => {
    navigate(`/storage/stock_transfers/create`);
  };
  const hanldeRow = (e: any) => {
    navigate(`/storage/stock_transfers/${e.id}`);
  };
  return (
      <div className="p-5">
        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "35px",
              alignItems: "center",
            }}
        >
          <h1 style={{ fontSize: "30px", margin: 0, marginRight: 10 }}>
            Đơn chuyển hàng
          </h1>
          <Button type="primary" onClick={hanldeClick}>
            + Tạo phiếu chuyển hàng
          </Button>
        </div>

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
            pagination={false}
        />
        <Pagination defaultCurrent={1} total={total} onChange={onChange} />
            <Modal
                title="Điều chỉnh cột hiển thị"
                visible={colSettingModal}
                onCancel={() => setColSettingModal(false)}
                footer={null}
            >
              <Transfer
                  dataSource={mockData}
                  targetKeys={targetKeys}
                  onChange={handleChange}
                  render={(item) => item.title}

              />
            </Modal>
      </div>
  );
};
