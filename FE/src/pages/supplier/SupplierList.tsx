import {Button, Dropdown, Menu, Modal, Space, Table, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {ISupplier, TypeSupplier} from "../../services/customType";
import {createSupplier, deleteSupplier, getSuppliers, updateStatusSupplier} from "../../services/api";
import {SupplierColumn} from "../../components/Datatablesource";
import {Link, useNavigate} from "react-router-dom";
import "../../styles/Table.css";
import type {MenuProps} from 'antd';
import {DownOutlined, DeleteOutlined, StopOutlined, InfoCircleOutlined} from '@ant-design/icons';
import ToastCustom from "../../features/toast/Toast";
import Swal from "sweetalert2";
import SupplierCreate from "./SupplierCreate";

const SupplierList = () => {
    const {Title} = Typography;
    const [data, setData] = useState([{} as ISupplier])

    const [reload, setReload] = useState(false);



    useEffect(() => {
        getSuppliers().then((r) => {
            setData(r.data.reverse())
        })

    }, [reload])

    const navigate = useNavigate()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    let hasSelected = selectedRowKeys.length > 0;

    const handleMenuClick: MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                onUpdateFalseStatus(selectedRowKeys);
                break
            case '2':
                onUpdateTrueStatus(selectedRowKeys);
                break
            case '3':
                onDelete(selectedRowKeys);
                break
        }
    };

    const onDelete = (listId: React.Key[]) => {
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
                deleteSupplier(listId).then(() => {
                    ToastCustom.fire({
                        icon: 'success',
                        title: 'Delete category successfully'
                    }).then(r => {
                    })
                    setReload(!reload)
                    setSelectedRowKeys([])
                })

            }
        })
    }

    const onUpdateTrueStatus = (listId: React.Key[]) => {
        updateStatusSupplier(listId, "true").then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: 'Sửa trạng thái thành công'
            }).then(r => {
            })
            setReload(!reload)
            setSelectedRowKeys([])
        })
    }
    const onUpdateFalseStatus = (listId: React.Key[]) => {
        updateStatusSupplier(listId, "false").then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: 'Sửa trạng thái thành công'
            }).then(r => {
            })
            setReload(!reload)
            setSelectedRowKeys([])
        })
    }


    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: <Link to="#">Ngừng giao dịch</Link>,
                    key: '1',
                    icon: <StopOutlined/>,
                },
                {
                    label: <Link to="#">Cập nhập trạng thái</Link>,
                    key: '2',
                    icon: <InfoCircleOutlined/>,
                },
                {
                    label: <Link to="#">Xóa nhà cung cấp</Link>,
                    key: '3',
                    icon: <DeleteOutlined/>,

                },
            ]}
        />
    );


    return (
        <>
            <Title>Nhà cung cấp</Title>
            <div style={{marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div>
                    <Dropdown overlay={menu} disabled={!hasSelected}>
                        <Button style={{width: "180px", fontSize: '14px'}} type="primary">
                            <Space>
                                Thao tác
                                <DownOutlined/>
                            </Space>
                        </Button>
                    </Dropdown>
                    <span style={{marginLeft: 8, marginRight: 8}}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} istems` : ''}
                </span>
                </div>
                <div>
                    <SupplierCreate reload={() => setReload(!reload)}/>
                </div>
            </div>
            <Table dataSource={data}
                   columns={SupplierColumn}
                   rowKey="id" bordered
                   pagination={{defaultPageSize: 2}}
                   onRow={(record) => {
                       return {
                           onClick: event => navigate({pathname: `/supplier/details/${record.id}`}),
                       }
                   }}

                   rowSelection={rowSelection}
            />
        </>
    )
}

export default SupplierList;
