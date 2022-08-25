import { useQuery } from "@tanstack/react-query";
import { Pagination, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { IRole } from "../interface";

const columns: ColumnsType<IRole> = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "title",
  },
];
const datas: any[] = [
  {
    id: 1,
    name: "Tawnya",
  },
  {
    id: 2,
    name: "Tamar",
  },
  {
    id: 3,
    name: "Neile",
  },
  {
    id: 4,
    name: "Amery",
  },
  {
    id: 5,
    name: "Gottfried",
  },
  {
    id: 6,
    name: "Sallie",
  },
  {
    id: 7,
    name: "Alyson",
  },
  {
    id: 8,
    name: "Gisella",
  },
  {
    id: 9,
    name: "Tarah",
  },
  {
    id: 10,
    name: "Juliane",
  },
  {
    id: 11,
    name: "Chickie",
  },
  {
    id: 12,
    name: "Cosmo",
  },
  {
    id: 13,
    name: "Bing",
  },
  {
    id: 14,
    name: "Quintana",
  },
  {
    id: 15,
    name: "Darn",
  },
  {
    id: 16,
    name: "Mal",
  },
  {
    id: 17,
    name: "Janessa",
  },
  {
    id: 18,
    name: "Delmar",
  },
  {
    id: 19,
    name: "Stearne",
  },
  {
    id: 20,
    name: "Lilian",
  },
  {
    id: 21,
    name: "Kailey",
  },
  {
    id: 22,
    name: "Helene",
  },
  {
    id: 23,
    name: "Jard",
  },
  {
    id: 24,
    name: "Tremain",
  },
  {
    id: 25,
    name: "Eddy",
  },
  {
    id: 26,
    name: "Evita",
  },
  {
    id: 27,
    name: "Nariko",
  },
  {
    id: 28,
    name: "Lemmie",
  },
  {
    id: 29,
    name: "Cathleen",
  },
  {
    id: 30,
    name: "Dodie",
  },
  {
    id: 31,
    name: "Jocelyne",
  },
  {
    id: 32,
    name: "Lev",
  },
  {
    id: 33,
    name: "Toni",
  },
  {
    id: 34,
    name: "Arnie",
  },
  {
    id: 35,
    name: "Tish",
  },
  {
    id: 36,
    name: "Genevra",
  },
  {
    id: 37,
    name: "Haily",
  },
  {
    id: 38,
    name: "Guinevere",
  },
  {
    id: 39,
    name: "Krysta",
  },
  {
    id: 40,
    name: "Lammond",
  },
  {
    id: 41,
    name: "Hy",
  },
  {
    id: 42,
    name: "Sella",
  },
  {
    id: 43,
    name: "Riobard",
  },
  {
    id: 44,
    name: "Harrie",
  },
  {
    id: 45,
    name: "Aaren",
  },
  {
    id: 46,
    name: "Neale",
  },
  {
    id: 47,
    name: "Cozmo",
  },
  {
    id: 48,
    name: "Tremayne",
  },
  {
    id: 49,
    name: "Hamish",
  },
  {
    id: 50,
    name: "Nikos",
  },
  {
    id: 51,
    name: "Izzy",
  },
  {
    id: 52,
    name: "Laurie",
  },
  {
    id: 53,
    name: "Cynthie",
  },
  {
    id: 54,
    name: "Kippar",
  },
  {
    id: 55,
    name: "Lonni",
  },
  {
    id: 56,
    name: "Traver",
  },
  {
    id: 57,
    name: "Dara",
  },
  {
    id: 58,
    name: "Adlai",
  },
  {
    id: 59,
    name: "Maynord",
  },
  {
    id: 60,
    name: "Glynnis",
  },
  {
    id: 61,
    name: "Bank",
  },
  {
    id: 62,
    name: "Walther",
  },
  {
    id: 63,
    name: "Albertina",
  },
  {
    id: 64,
    name: "Vassili",
  },
  {
    id: 65,
    name: "Sandi",
  },
  {
    id: 66,
    name: "Rosana",
  },
  {
    id: 67,
    name: "Lydie",
  },
  {
    id: 68,
    name: "Tymon",
  },
  {
    id: 69,
    name: "Pier",
  },
  {
    id: 70,
    name: "Sharai",
  },
  {
    id: 71,
    name: "Odele",
  },
  {
    id: 72,
    name: "Craggie",
  },
  {
    id: 73,
    name: "Hilly",
  },
  {
    id: 74,
    name: "Dionysus",
  },
  {
    id: 75,
    name: "Leeanne",
  },
  {
    id: 76,
    name: "Elisabeth",
  },
  {
    id: 77,
    name: "Griselda",
  },
  {
    id: 78,
    name: "Monica",
  },
  {
    id: 79,
    name: "Eadith",
  },
  {
    id: 80,
    name: "Rochester",
  },
  {
    id: 81,
    name: "Siouxie",
  },
  {
    id: 82,
    name: "Brent",
  },
  {
    id: 83,
    name: "Gabrila",
  },
  {
    id: 84,
    name: "Emili",
  },
  {
    id: 85,
    name: "Tyson",
  },
  {
    id: 86,
    name: "Geoff",
  },
  {
    id: 87,
    name: "Hastings",
  },
  {
    id: 88,
    name: "Lambert",
  },
  {
    id: 89,
    name: "Tonye",
  },
  {
    id: 90,
    name: "Xenos",
  },
  {
    id: 91,
    name: "Wallis",
  },
  {
    id: 92,
    name: "Caitrin",
  },
  {
    id: 93,
    name: "Hieronymus",
  },
  {
    id: 94,
    name: "Jameson",
  },
  {
    id: 95,
    name: "Minerva",
  },
  {
    id: 96,
    name: "Natty",
  },
  {
    id: 97,
    name: "Kara-lynn",
  },
  {
    id: 98,
    name: "Faythe",
  },
  {
    id: 99,
    name: "Wenona",
  },
  {
    id: 100,
    name: "Brandi",
  },
];

export const T = (props: any) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const query = useQuery(["id", page, pageSize], async () => {
    console.log(page, pageSize);

    return (
      await axios.get(props.api, {
        params: {
          page,
          pageSize,
        },
      })
    ).data;
  });

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
      <Spin spinning={query.isLoading} tip="Loading...">
        <Table
          {...props}
          dataSource={query.data}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
        <Pagination
          onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
            query.refetch()
          }}
          total={props.total || 100}
        />
      </Spin>
    </div>
  );
};
