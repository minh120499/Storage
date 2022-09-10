import { useQuery } from "@tanstack/react-query";
import { Pagination, Spin, Table } from "antd";
import { useState } from "react";
import PageResult from "../components/PageResult";

const T = (props: any) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const name = props?.search?.filterName;
  const value = props?.search?.filterValue;

  const query = useQuery(
    ["id", page, pageSize],
    () => {
      if (!!name && !!value) {
        return props.query(page, pageSize, name, value);
      } else {
        return props.query(page, pageSize);
      }
    },
    { keepPreviousData: true }
  );

  if (query?.isError) {
    return <PageResult />;
  }

  if (query?.data?.data?.length === 0) {
    if (page > 2) {
      setPage(page - 1);
    }
    // setPage(1);
  }
  query.refetch();

  return (
    <div>
      <Spin spinning={query?.isLoading || false} tip="Loading...">
        <Table
          {...props}
          pagination={false}
          dataSource={props?.dataSource || query?.data?.data || []}
        />
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
      </Spin>
    </div>
  );
};

export default T;
