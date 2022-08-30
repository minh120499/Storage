import { useQuery } from "@tanstack/react-query";
import { Pagination, Spin, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { getAllInventory } from "../api/inventory";

const T = (props: any) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const query = props.query;

  // props.refetch = () => {
  //   query.refetch()
  // }

  if (query.isError) {
    console.log(query.error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fails",
    });
    return <div>Api not found</div>;
  }

  return (
    <div>
      <Spin spinning={query?.isLoading || false} tip="Loading...">
        <Table
          {...props}
          pagination={false}
          dataSource={props?.dataSource || query?.data || []}
          rowSelection={null}
        />
        <div className="flex flex-row-reverse mt-5">
          {!!props.total && (
            <Pagination
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
                query?.refetch();
              }}
              total={props.total}
            />
          )}
        </div>
      </Spin>
    </div>
  );
};

export default T;
