import { FC, useEffect, useState } from "react";
import type { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import * as Antd from "antd";
import { Grid, Paper } from "@mui/material";
import SelectSupplierV2 from "./SelectSupplierV2";
import SelectInventory from "./SelectInventory";
// import LineChartReport from "../../components/Home/LineChartReport";
import {
  ImportSortOptions,
  ImportStatistic,
  StatisticsFilter,
} from "../../type/allType";
import { getStatisticsImportExtend } from "../../services/statisticsService";
// import { render } from "@testing-library/react";
// import Moment from "react-moment";
import { ColumnProps } from "antd/es/table";
import SelectSortby from "./SelectSortBy";
import CardDetails from "./CardDetails";
import LineCharImport from "./LineChartImport";
import { useNavigate } from "react-router-dom";
// const normalImportCol = [

//     {
//         title: 'Tên sản phẩm',
//         dataIndex: 'name',
//         key: 'name',
//     },
//     {
//         title: 'Tổng Đặt',
//         dataIndex: "importNumber",
//         key: "importNumber"
//     },
//     {
//         title: "Trả lại",
//         dataIndex: "returnNumber",
//         key: "returnNumber"
//     },

//     {
//         title: "Nhập kho",
//         dataIndex: "receiveNumber",
//         key: "receiveNumber"
//     },
//     {
//         title: "Số tiền thanh toán",
//         dataIndex: "totalPrice",
//         key: "totalPrice",
//         render: (totalPrice: number) => {
//             return (
//                 <div>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ</div>
//             )
//         }
//     }

// ]

const Statistics: FC = () => {
  const navigate = useNavigate();
  const extendImportCol: ColumnProps<ImportStatistic>[] = [
    {
      title: "Mã Phiếu nhập",
      dataIndex: "importCode",
      key: "importCode",
      width: "10%",

      render: (importCode: string) => {
        return (
          <Antd.Tag
            color="green"
            onClick={() => {
              navigate(`/purchase_orders/details/${importCode}`);
            }}
          >
            {importCode}
          </Antd.Tag>
        );
      },
    },

    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tổng Đặt",
      dataIndex: "importNumber",
      key: "importNumber",
      width: "7%",
      align: "center",
      render: (data: number) => {
        return data > 0 ? data : "---";
      },
    },
    {
      title: "Trả lại",
      dataIndex: "returnNumber",
      key: "returnNumber",
      width: "7%",
      align: "center",
      render: (data: number) => {
        return data > 0 ? data : "---";
      },
    },

    {
      title: "Nhập kho",
      dataIndex: "receiveNumber",
      key: "receiveNumber",
      width: "7%",
      align: "center",
      render: (data: number) => {
        return data > 0 ? data : "---";
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "importPrice",
      key: "importPrice",
      width: "12%",

      render: (importPrice: number) => {
        return importPrice ? (
          <div>
            {importPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
          </div>
        ) : (
          "---"
        );
      },
    },
    {
      title: "Số tiền thanh toán",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "12%",

      render: (totalPrice: number) => {
        return totalPrice ? (
          <div>
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
          </div>
        ) : (
          "---"
        );
      },
    },

    {
      title: "Ngày giao dự kiến",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      width: "12%",

      // render: (deliveryDate:string)=>
      //     {
      //     return (
      //         totalPrice?
      //         <div>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') } VNĐ</div>:0
      //     )
      // }
    },

    {
      title: "Thời điểm nhập",
      dataIndex: "createAt",
      key: "createAt",
      width: "12%",

      render: (data: string) => {
        const moment = require("moment");
        const d = new Date(data);
        return (
          <div>{moment(d, ["hh:mm A"]).format("DD-MM-YYYY HH:mm:ss")}</div>
        );
      },
    },
  ];

  var fstring = localStorage.getItem("importFilter");
  var filter: StatisticsFilter = fstring
    ? JSON.parse(fstring)
    : {
        inventoryId: -1,
        supplierId: -1,
        startDate: 0,
        endDate: new Date().getTime(),
        sortBy: "name",
        sortDir: true,
        productName: "",
        tag: 0,
        page: 1,
        size: 10,
        type: 1,
        statisticsType: 1,
      };
  const [filterProps, setFilterProps] = useState<StatisticsFilter>(filter);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [loadding, setLoadding] = useState(false);
  //   const [extend, setExtend] = useState<boolean>(true);
  const [imports, setImports] = useState<ImportStatistic[]>([]);

  useEffect(() => {
    setLoadding(true);

    getStatisticsImportExtend(filter)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setImports(data);
      })
      .catch((erro) => {});
    setLoadding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitFilter = (data: any) => {
    localStorage.setItem("importFilter", JSON.stringify(filter));
    closeFilter();

    console.log(filter);
    setLoadding(true);

    setFilterProps(filter);
    getStatisticsImportExtend(filter)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setImports(data);
      })
      .catch((erro) => {});
    setLoadding(false);
  };
  const closeFilter = () => {
    setIsOpenFilter(false);
  };
  const showFilter = () => {
    var filterString = localStorage.getItem("importFilter");
    filter = filterString ? JSON.parse(filterString) : filter;
    setIsOpenFilter(true);
    console.log(filter);
  };

  const StatisticsFilter = () => {
    // const [type, setType] = useState<number>(filter.type);
    const [statisticsType, setStatisticsType] = useState<number>(
      filter.statisticsType
    );

    // const setFilter = (filter: StatisticsFilter) => {
    //   filter = filter;
    // };
    const changeSupplierId = (id: number) => {
      console.log(id);
      filter.supplierId = id;
    };

    const onTimeChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
      var date1 = new Date(dateStrings[0]);
      var date2 = new Date(dateStrings[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      filter.startDate = date1.getTime();
      filter.endDate = date2.getTime();
      console.log(filter);
    };
    const onSortByChange = (value: string) => {
      filter.sortBy = value;
    };
    return (
      <Antd.Drawer
        title="Lựa chọn thống kê"
        placement={"right"}
        onClose={closeFilter}
        visible={isOpenFilter}
        width={"35%"}
      >
        <Antd.Form onFinish={onSubmitFilter}>
          <Grid item xs={12}>
            <Antd.Form.Item label={"Thống kế: "}>
              <Antd.Radio.Group
                defaultValue={filter.type}
                name="type"
                buttonStyle="solid"
                onChange={(e) => {
                  filter.type = e.target.value;
                }}
              >
                <Antd.Radio.Button value={1}>Nhập kho</Antd.Radio.Button>
                <Antd.Radio.Button value={2}>Tồn kho</Antd.Radio.Button>
                <Antd.Radio.Button value={3}>Xuất kho</Antd.Radio.Button>
              </Antd.Radio.Group>
            </Antd.Form.Item>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Antd.Form.Item label={"Top: "} name={"size"}>
                <Antd.InputNumber
                  style={{ width: "100%" }}
                  defaultValue={filter.size}
                  onChange={(value: number) => (filter.size = value)}
                  placeholder="Nhập số lượng"
                ></Antd.InputNumber>
              </Antd.Form.Item>
            </Grid>
            <Grid item xs={6}>
              <Antd.Form.Item
                label={"Sắp xếp theo: "}
                name={"sortBy"}
                style={{ width: "100%" }}
              >
                <SelectSortby
                  initValue={filter.sortBy}
                  sortOptions={ImportSortOptions}
                  onChange={onSortByChange}
                ></SelectSortby>
              </Antd.Form.Item>
            </Grid>

            <Grid item xs={3}>
              <Antd.Form.Item
                label={"Tăng dần: "}
                name={"sortDir"}
                style={{ width: "100%" }}
              >
                <Antd.Switch
                  defaultChecked={filter.sortDir}
                  onChange={(check, e) => {
                    filter.sortDir = check;
                  }}
                ></Antd.Switch>
              </Antd.Form.Item>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Antd.Form.Item label={"Kiểu thống kê: "}>
              <Antd.Radio.Group
                defaultValue={filter.statisticsType}
                buttonStyle="solid"
                onChange={(e) => {
                  filter.statisticsType = e.target.value;
                  setStatisticsType(e.target.value);
                }}
              >
                <Antd.Radio.Button value={1}>Chung</Antd.Radio.Button>
                <Antd.Radio.Button value={2}>Sản phẩm cụ thể</Antd.Radio.Button>
                <Antd.Radio.Button value={3}>Chưa biết</Antd.Radio.Button>
              </Antd.Radio.Group>
            </Antd.Form.Item>
            {statisticsType === 2 ? (
              <Antd.Form.Item
                label={"Mã sản phẩm cụ thể: "}
                labelCol={{ span: 24 }}
              >
                <Antd.Input
                  width={"100%"}
                  placeholder="Nhập mã sản phẩm"
                ></Antd.Input>
              </Antd.Form.Item>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <SelectInventory
                  initValue={filter.inventoryId}
                  onChange={(id: number) => {
                    filter.inventoryId = id;
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectSupplierV2
                  initValue={filter.supplierId}
                  changeSupplierId={changeSupplierId}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Antd.Form.Item
              label="Thời gian"
              name={"time"}
              labelCol={{ span: 24 }}
            >
              <Antd.DatePicker.RangePicker
                defaultValue={[
                  moment(filter.startDate),
                  moment(filter.endDate),
                ]}
                size="large"
                style={{ width: "100%" }}
                ranges={{
                  "Hôm nay": [moment().startOf("day"), moment().endOf("day")],
                  "Tuần này": [
                    moment().startOf("week"),
                    moment().endOf("week"),
                  ],
                  "Tháng này": [
                    moment().startOf("month"),
                    moment().endOf("month"),
                  ],
                  "Năm nay": [moment().startOf("year"), moment().endOf("year")],
                }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                onChange={onTimeChange}
              />
            </Antd.Form.Item>
          </Grid>
          <Antd.Button htmlType="submit"> Lọc</Antd.Button>
        </Antd.Form>
      </Antd.Drawer>
    );
  };

  return (
    <Antd.Spin spinning={loadding} tip={"Đang thống kê"}>
      <div className="p-5">
        <Antd.Button onClick={showFilter}>Lọc</Antd.Button>
        <StatisticsFilter />
        <Grid container spacing={2}>
          <Grid item xs={4} container spacing={2}>
            <Grid item xs={12}>
              <CardDetails
                filter={filterProps}
                loadding={loadding}
              ></CardDetails>
            </Grid>

            <Grid item xs={12}>
              <Paper style={{ height: 200, width: "100%" }}></Paper>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Paper
              style={{
                borderRadius: 5,
                height: 420,
                width: "100%",
                padding: 20,
              }}
            >
              <LineCharImport />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Antd.Table
              style={{ height: 400 }}
              dataSource={imports}
              columns={extendImportCol}
              bordered
              rowKey=""
            ></Antd.Table>
          </Grid>
        </Grid>
      </div>
    </Antd.Spin>
  );
};
export default Statistics;
