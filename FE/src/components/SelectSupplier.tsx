import * as Antd from "antd";
import React, {useEffect, useState} from "react";
import {ISupplier} from "../services/customType";
import {getSuppliers} from "../services/api";

type Props = {
    changeSupplierId: (n:number) =>void
}
const SelectSupplier = ({changeSupplierId} : Props) => {

    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [supplierId, setSupplierId] = useState<number>();
    useEffect(()=>{
        getSuppliers().then((r) => {
            setSuppliers(r.data.reverse())
        })
    },[])
    const handleSelectSupplier = (key: number) => {
        setSupplierId(key)
        changeSupplierId(key)
    }
    return (
        <Antd.Form.Item label='Nhà cung cấp' name={'supplierId'} labelCol={{ span: 24 }}>
        <Antd.Select style={{ width: '100%', marginBottom: 10, borderRadius: 5 }} size={'large'}
                         showSearch
                         placeholder="Nhấn để chọn nhà cung cấp"
                         optionFilterProp="children"
                         // defaultValue={supplierId}
                         onChange={handleSelectSupplier}
                         filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                         filterSort={(optionA, optionB) =>
                             (optionA!.children as unknown as string)
                             .toLowerCase()
                             .localeCompare((optionB!.children as unknown as string).toLowerCase())
                         }

            >
                {
                    suppliers.map((supplier, index) => {
                        return (
                            <Antd.Select.Option key={supplier.id} value={supplier.id}>

                                {supplier.code+' | '+supplier.name}

                            </Antd.Select.Option>
                        )
                    })
                }
            </Antd.Select>
        </Antd.Form.Item>
    )
}
export default SelectSupplier