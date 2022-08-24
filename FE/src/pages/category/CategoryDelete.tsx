import React from "react";
import { Button, Space } from 'antd';
import Swal from "sweetalert2";
import ToastCustom from "../../features/toast/Toast";
import axios from "axios";

type props = {
    selected: boolean,
    selectedKey: React.Key[],
    status: () => void,
    setSelected: () => void
}

export default function CategoryDelete({selectedKey, status,selected,setSelected}:props) {

    const handleDelete = () => {
        Swal.fire({
          title: 'Bạn có chắc?',
          text: "Bạn không thể hồi phục lại dữ liệu!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post("http://localhost:8080/api/categories/delete", selectedKey).then(() => {
              ToastCustom.fire({
                icon: 'success',
                title: 'Delete category successfully'
              }).then(r => {
                status();
              })
              setSelected()
            })
          }
        })
      }

    return (
        <>
            <div>
                <Button type="primary" style={{ width: "121px" }} onClick={handleDelete} disabled={selected ? false : true} >
                    <Space>
                        Xoá danh mục
                    </Space>
                </Button>
            </div>
        </>
    )
}