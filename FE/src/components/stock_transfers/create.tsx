/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import {
    Select,
    Popconfirm,
    Input,
    PageHeader,
    message,
    Spin,
    Empty,
} from "antd";
import React, { useEffect, useState } from "react";
import { findProductById } from "../../api/product_variant";
import "./file.css";
import { getAllInventory, getProductVariants } from "../../api/inventory";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation } from "@tanstack/react-query";
import { createExport } from "../../api/export";
import { creatDetailExport } from "../../api/detail_export";
import { Button } from "antd";
import { DataType, inventory } from "../type/data_type";
import { DeleteTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ModalTable } from "./create/modal_table";
import { SelectInventory } from "./create/select_inventory";
import { createExportStatus } from "../../api/export_status";

const Create: React.FC = () => {
    const [products, setProducts] = useState<any>([]);
    const [inventorySend, setInventorySend] = useState<inventory | undefined>();
    const [inventoryReceive, setInventoryReceive] = useState<
        inventory | undefined
        >();
    const [exportId, setExportId] = useState<number | undefined>();
    const [loading, setLoading] = useState(false);
    const [inventoryId, setInventoryId] = useState(1);
    const navigate = useNavigate();
    const exportValue = {
        exportInventory: inventorySend,
        receiveInventory: inventoryReceive,
    };

    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        let b = 0;
        products.map((e: any) => {
            b += e.quantity * 1;
        });
        setTotal(b);
        setQuantityProducts(products.length);
    }, [products]);
    const handleDelete = (e: any) => {
        const newData = products.filter(
            (item: any) => item.getProductById.id *1 !== e * 1
    );
        setProducts(newData);
    };
    const handleQuantity = (e: any) => {
        const quantity = e.target.value;
        const id = e.target.id * 1;
        setProducts((prev: any) => {
            prev.map((prod: any) => {
                if (prod.getProductById.id === id) {
                    prod.quantity = quantity * 1;
                }
            });
            return [...prev];
        });
    };
    const data: DataType[] = products;

    const columns: ColumnsType<DataType> = [
        {
            title: "Mã hàng",
            dataIndex: "getProductById",
            render: (text) => {
                return <div>{text?.code}</div>;
            },
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "getProductById",
            render: (text) => {
                return <div>{text?.name}</div>;
            },
        },
        {
            title: "Số lượng chuyển",
            dataIndex: ["quantity", "getProductById"],
            render: (a, text) => {
                return (
                    <Input
                        type={"number"}
                        style={{ width: "50%" }}
                        onChange={handleQuantity}
                        id={text?.getProductById.id}
                        key={text?.getProductById.id}
                        value={text.quantity}
                        min={1}
                        size={"middle"}
                    />
                );
            },
        },
        {
            dataIndex: ["getProductById"],
            render: (text) => {
                return (
                    <Popconfirm
                        id={text?.id}
                        key={text?.id}
                        title="Chắc chắn xoá ?"
                        onConfirm={() => handleDelete(text?.id)}
                        okText={"Ok"}
                        cancelText={"No"}
                    >
                        <DeleteTwoTone />
                    </Popconfirm>
                );
            },
        },
    ];
    const [quantityProducts, setQuantityProducts] = useState<number>(0);

    const handleClickOptionProduct = (e: any) => {
        const id = e[1] * 1;
        const isFound = products.findIndex(
            (element: any) => element.getProductById.id === id
        );
        const hanldeClick = async () => {
            const getProductById = await findProductById(id);
            setProducts([
                {
                    getProductById: getProductById,
                    quantity: 1,
                },
                ...products,
            ]);
        };
        if (isFound < 0) {
            hanldeClick();
        } else {
            message.warning(
                <div style={{ color: "red" }}>Sản phẩm đã được chọn</div>
            );
            setProducts((prev: any) => {
                prev.map((prod: any) => {
                    if (prod.getProductById.id === id) {
                        prod.quantity = prod.quantity * 1 + 1;
                    }
                });
                return [...prev];
            });
        }
    };

    const [productVariant, setProductVariant] = useState<any>();
    const [listInventory, setListInventory] = useState<any>();
    const allQueries = async () => {
        const productVariant = await getProductVariants(inventoryId);
        const getListInventory = await getAllInventory();
        // console.log(productVariant);
        setProductVariant(productVariant.productVariants);
        setListInventory(getListInventory);
    };
    useEffect(() => {
        allQueries();
    }, [inventoryId]);

    const dataProduct = productVariant;

    const handleSubmit = async () => {
        setLoading(true);
        // console.log(exportValue.exportInventory);

        if (exportValue.receiveInventory !== undefined) {
            const saveExport = await createExport(exportValue);
            const exportId = saveExport.data.id;
            setExportId(exportId);
            const detailExport = products.map((e: any) => {
                return {
                    productVariant: e.getProductById,
                    quantity: e.quantity,
                    export: exportId,
                    code: "TPN000" + exportId,
                };
            });
            creatDetailExportSubmit.mutate(detailExport);
        } else {
            message.error(
                <div style={{ color: "red" }}>Chi nhánh chuyển chưa được chọn</div>
            );
            setLoading(false);
        }

        // console.log(detailExport);
    };

    const creatDetailExportSubmit = useMutation((item: any) =>
        creatDetailExport(item)
    );
    const handleStatus = async (id?: number) => {
        await createExportStatus({
            export: id,
            status: 0,
            code: "TPN000" + id,
        });
        navigate(`/storage/stock_transfers/${id}`);
    };
    if (creatDetailExportSubmit.isSuccess) {
        handleStatus(exportId);
    }
    // console.log(products);
    return (
        <>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Tạo phiếu chuyển hàng"
                    subTitle=""
                    extra={[
                        <Button key="2">Huỷ</Button>,

                        <Button
                            key="1"
                            type="primary"
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Lưu
                        </Button>,
                    ]}
                />
            </div>
            <div className="content p-5">
                <div className="content-top">
                    <SelectInventory
                        setInventorySend={(e: any) => setInventorySend(e)}
                        setInventoryReceive={(e: any) => setInventoryReceive(e)}
                        listInventory={listInventory}
                        setInventoryId={(e: any) => setInventoryId(e)}
                    />
                    <div className="additional-information">
                        <div className="title">
                            <h3>Thông tin bổ sung</h3>
                        </div>
                        <div>
                            <p>Ghi chú</p>
                            <textarea
                                rows={3}
                                style={{ width: "100%" }}
                                placeholder={"VD : Giao hàng nhanh"}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="background-export">
                    <div className="title">
                        <h3>Thông tin sản phẩm</h3>
                    </div>
                    <div className="menu">
                        <div className="menu-select">
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                dropdownStyle={{ width: 1000 }}
                                placeholder="Tìm kiếm sản phẩm"
                                onSelect={handleClickOptionProduct}
                            >
                                {productVariant !== undefined ? (
                                    productVariant.map((item: DataType) => (
                                        <Select.Option
                                            value={[item.name, item.id]}
                                            style={{ width: "100%" }}
                                            key={item.id}
                                        >
                                            <div>
                                                <div>{item.name}</div>
                                                <div>
                                                    Tồn : {item.quantity} | Có thể bán : {item.quantity}
                                                </div>
                                            </div>
                                        </Select.Option>
                                    ))
                                ) : (
                                    <Spin />
                                )}
                            </Select>
                        </div>
                        <ModalTable
                            products={products}
                            setProducts={(e) => setProducts(e)}
                            dataProduct={dataProduct}
                            quantityProducts={quantityProducts}
                            handleQuantity={(e) => handleQuantity(e)}
                        />
                    </div>
                    <div>
                        {products.length > 0 ? (
                            <Table
                                rowKey="uid"
                                columns={columns}
                                dataSource={data}
                                style={{
                                    width: "100%",
                                }}
                                scroll={{ y: 240 }}
                                pagination={false}
                            />
                        ) : (
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{
                                    height: 60,
                                }}
                                description={<span>Chưa chọn sản phẩm</span>}
                            >

                            </Empty>
                        )}
                    </div>
                    <div className="export-bottom">
                        <li className="">
                            <div className="">
                <span>
                  Tổng số lượng chuyển ({quantityProducts} sản phẩm) :
                </span>
                            </div>
                            <div className="">
                                <span>{total}</span>
                            </div>
                        </li>
                        <li>
                            <div className="">
                                <span>Tổng giá trị chuyển : {total}</span>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;
