import { useQuery } from "@tanstack/react-query";
import { Pagination, Spin, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

/**
 * 
 * @Prop cần thiết
 * @API : link api. API='https://example.com'
 * @Total : Tổng số record để chia trang table. VD: total = 100 => pagination có 10 trang
 * 
 * Ngoài 2 props trên thì chỉ nhận các props của antd table
 * 
 * @NOTE
 *  chia page theo 2 params: limit và offset
 * @limt : giới hạn data trên 1 trang
 * @Offset : ví trị của data trong database
 */

const T = (props: any) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);


  const query = useQuery(["id", page, pageSize], async () => {
    // console.log(page, pageSize);

    return (
      await axios.get(props.api, /*{
        params: {
          limit: page,
          offset: pageSize,
        },
      }*/)
    ).data;
  });
  props.refetch = () => {
    query.refetch()
  }

  if (query.isError) {
    // console.log(query.error);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fails",
    });

    return <div>Api not found</div>;
  }


  return (
    <div>
      <Spin spinning={query.isLoading} tip="Loading...">
        <Table {...props} pagination={false} dataSource={props.dataSource || query.data} />
        <div className="flex flex-row-reverse mt-5">
          {!!props.total && (
            <Pagination
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
                query.refetch();
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
