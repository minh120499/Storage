import { Input, Table } from "antd";
import { useState } from "react";

export default function HomePage() {
  console.log();
  const [state1, setState1] = useState<any>([]);

  const a = (e: any) => {
    const quantity = e.value;
    const index = e.id;

    const dulieu = {
      exportId: index,
      product_va: 1,
      quantity: quantity,
    };

    const datontai = state1.findIndex((p: any) => {
      return p.exportId === index;
    });

    if (datontai < 0) {
      setState1([...state1, dulieu]);
    } else {
      state1[datontai].quantity = quantity;
      setState1(state1);
    }
    console.log(state1);
    
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "soluonwg",
      key: "soluong",
      render: (key: any) => {
        return (
          <Input onChange={(e) => a(e.target)} id={key.key} key={key.key} />
        );
      },
    },
  ];
  return (
    <div>
      state1: {state1[0]?.quantity}
      state2: {state1[1]?.quantity}
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
