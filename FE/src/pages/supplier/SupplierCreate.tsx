import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Select, Space} from 'antd';
import "antd/dist/antd.css";
import {TypeSupplier} from "../../services/customType";
import {createSupplier, getDistrict, getProvince, getWard} from "../../services/api";
import ToastCustom from "../../features/toast/Toast";

type SupplierProps = {
    reload: () => void
}
type AddressType = {
    code: number,
    name: string
}
const SupplierCreate = ({reload}: SupplierProps) => {
    const {Option} = Select;

    const [form] = Form.useForm();
    const onFormSubmit = (supplier: TypeSupplier) => {
        supplier.accountId = Number(1)
        supplier.code = ''
        createSupplier(supplier).then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: 'Thêm nhà cung cấp thành công'
            }).then()
            setVisible(false);
            form.resetFields();
            reload()
        }).catch((err) => {
            const error = err.response.data.message
            ToastCustom.fire({
                icon: 'error',
                title: "Thêm nhà cung cấp thất bại",
                html: `${error}`
            }).then()
        })
    }
    const [visible, setVisible] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);


    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setDistricts([])
        setWards([])
        setDetailAddress("")
        setWardName("")
        setDistrictName("")
        setProvinceName("")
    };
    const onChangeProvinces = (value: string) => {
        setProvinceCode(value)
        const item = provinces.find((p) => {
            return p.code.toString() == value
        })
        item && setProvinceName(", "+ item.name +", ")
    };
    const onChangeDistrict = (value: string) => {
        setDistrictCode(value)
        const item = districts.find((d) => {
            return d.code.toString() == value
        })
        item && setDistrictName(item.name  +", ")
    };
    const onChangeWard = (value: string) => {
        const item = wards.find((w) => {
            return w.code.toString() == value
        })
        item && setWardName(item.name  +", ")
    };



    const [provinces, setProvinces] = useState([{} as AddressType])
    const [districts, setDistricts] = useState([{} as AddressType])
    const [wards, setWards] = useState([{} as AddressType])

    const [provinceName, setProvinceName] = useState<string>("")
    const [districtName, setDistrictName] = useState<string>("")
    const [wardName, setWardName] = useState<string>("")

    const [provinceCode, setProvinceCode] = useState<string>()
    const [districtCode, setDistrictCode] = useState<string>()
    const [detailAddress,setDetailAddress] = useState<string>("")
    let address = detailAddress +  provinceName + districtName + wardName

    form.setFieldsValue({
        address: address
    })
    useEffect(() => {
        getProvince().then((p) => {
            setProvinces(p.data)
        })
    }, [])

    useEffect(() => {
        provinceCode && getDistrict(provinceCode as string).then((d) => {
            setDistricts(d.data.districts)
        })
    }, [provinceCode])

    useEffect(() => {
        districtCode && getWard(districtCode as string).then((w) => {
            setWards(w.data.wards)
        })
    }, [districtCode])


    return (
        <>
            <Button onClick={showModal} style={{width: "180px", fontSize: '14px'}} type="primary">
                <Space>
                    Thêm mới
                </Space>
            </Button>
            <Modal
                title="Thêm mới nhà cung cấp"
                visible={visible}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={700}
                footer={[]}
                forceRender
            >
                <div style={{background: "white", padding: 24}}>
                    <Form
                        form={form}
                        onFinish={onFormSubmit}
                        layout="vertical"
                    >
                        <Form.Item label="Tên nhà cung cấp" name="name" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Mã nhà cung cấp " name="code">
                                    <Input placeholder="Nhập tên nhà cung cấp"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Phone" name="phone"
                                           rules={[
                                               {
                                                   required: true,
                                               },
                                               {
                                                   pattern: (/((09|03|07|08|05)+([0-9]{8})\b)/g),
                                                   message: "SĐT không hợp lệ!"
                                               }
                                           ]}>
                                    <Input placeholder="Nhập SĐT"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{required: true, type: "email"}]}>
                                    <Input placeholder="Nhập email"/>
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{height: '100%'}}>
                                <Form.Item label="Nhân viên phụ trách" name="account">
                                    <Select
                                        showSearch
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        // onChange={onChange}
                                        // onSearch={onSearch}
                                        listItemHeight={10} listHeight={250}
                                        filterOption={(input, option) =>
                                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }
                                        dropdownStyle={{height: 100, width: 100}}
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Địa chỉ chi tiết" name="detailsAddress" rules={[{required: true}]}>
                                    <Input onChange={(e) => setDetailAddress(e.target.value)} placeholder="nhập địa chỉ nhà cung cấp"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Thành phố/Tỉnh" name="province" rules={[{required: true}]}>
                                    <Select
                                        showSearch
                                        placeholder="Chọn tỉnh thành phố"
                                        optionFilterProp="children"
                                        onChange={onChangeProvinces}
                                        // onSearch={onSearch}
                                        listItemHeight={1} listHeight={250}
                                        filterOption={(input, option) =>
                                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }
                                        dropdownStyle={{height: 250, width: 100}}
                                    >
                                        {
                                            provinces && provinces.map((p, key) => (
                                                <Option key={key} style={{width: 400}}
                                                        value={p.code}>{p.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Quận/Huyện" name="district" rules={[{required: true}]}>
                                    <Select
                                        showSearch
                                        placeholder="Chọn quận huyện"
                                        optionFilterProp="children"
                                        onChange={onChangeDistrict}
                                        listItemHeight={1} listHeight={250}
                                        filterOption={(input, option) =>
                                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }
                                        dropdownStyle={{height: 250, width: 100}}
                                    >
                                        {
                                            districts.length > 1 ? (
                                                districts.map((d, key) => (
                                                    <Option key={key} style={{width: 400}}
                                                            value={d.code}>{d.name}</Option>
                                                ))
                                            ) : (<Option style={{width: 400}}
                                                         value="default">Chọn quận huyện</Option>)
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Phường/Xã" name="ward" rules={[{required: true}]}>
                                    <Select
                                        showSearch
                                        placeholder="Chọn xã phường"
                                        optionFilterProp="children"
                                        onChange={onChangeWard}
                                        listItemHeight={1} listHeight={250}
                                        filterOption={(input, option) =>
                                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }
                                        dropdownStyle={{height: 250, width: 100}}
                                    >
                                        {
                                            wards.length > 1 ? (
                                                wards.map((w, key) => (
                                                    <Option key={key} style={{width: 400}}
                                                            value={w.code}>{w.name}</Option>
                                                ))
                                            ) : (<Option style={{width: 400}}
                                                         value="default">Chọn xã phường</Option>)
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Địa chỉ" name="address">
                            <Input disabled  placeholder="địa chỉ nhà cung cấp"/>
                        </Form.Item>
                        <Row>
                            <Col span={4}>
                                <Form.Item>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary">Submit</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>

        </>
    )
}
export default React.memo(SupplierCreate)