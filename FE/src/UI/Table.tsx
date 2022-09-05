import { useQuery } from "@tanstack/react-query";
import { Pagination, Spin, Table } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";

const T = (props: any) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const query = useQuery(
    ["id", page, pageSize],
    () => props.query(page, pageSize),
    { keepPreviousData: true, retry: 0 }
  );
  if (query?.isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fails",
    });
    return <div>Api not found</div>;
  }

  if (query?.data?.data?.length === 0) {
    setPage(page - 1);
  }
  query.refetch();

  return (
    <div>
      <Spin spinning={query?.isLoading || false} tip="Loading...">
        <div className="flex justify-between mt-5 mb-5">
          {query?.data?.total && (
            <div>{`${query?.data?.from}-${query?.data?.to} trên ${query.data.total} bản ghi`}</div>
          )}

          {query?.data?.total > 10 && (
            <Pagination
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              // defaultCurrent={1}
              current={page}
              total={props?.total || query?.data?.total}
            />
          )}
        </div>
        <Table
          {...props}
          pagination={false}
          dataSource={props?.dataSource || query?.data?.data || []}
        />
      </Spin>
    </div>
  );
};

export default T;
