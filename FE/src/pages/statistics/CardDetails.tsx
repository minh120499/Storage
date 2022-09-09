import { Paper } from '@mui/material'
import { Col, Row, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSupplierById } from '../../services/api'
import { ISupplier } from '../../services/customType'
import { getInventoryById } from '../../services/statisticsService'
import { Inventory, StatisticsFilter } from '../../type/allType'

interface Props {
    loadding: boolean,
    filter: StatisticsFilter
}
const CardDetails = (props: Props) => {
    const { filter } = { ...props }
    const [supplier, setSupplier] = useState<ISupplier>()
    const [inventory, setInventory] = useState<Inventory>()
    const navigate = useNavigate()
    useEffect(() => {
        if (filter.supplierId > 0)
            getSupplierById(filter.supplierId).then(r => {
                setSupplier(r.data)
                console.log(r.data);

            })
        if (filter.inventoryId > 0)
            getInventoryById(filter.inventoryId).then(r => {
                setInventory(r.data)
                console.log(r.data);

            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    const getInform = () => {
        var title='Thống kê '
        switch (filter.type) {
            case 1:
                    title=title.concat('Nhập kho')
                break;
            case 2:
                title=title.concat('Tồn kho')
                break;
            case 3:
                title=title.concat('Xuất kho')
                break;
            default:
                break;
        }
        switch (filter.statisticsType) {
            case 1:
                break;
            case 2:
                title=title.concat(' Theo sản phẩm cụ thể')
                break;
            case 3:
                break;
            default:
                break;
        }
        return title
    }
    return (
        <Paper style={{ height: 200, width: '100%', padding: 15 }}>
            <p>{getInform()}</p>
            <Row>
                <Col span={6}>
                    <p>Chi Nhánh:</p>
                </Col>
                <Col span={18}>
                    {filter.inventoryId > 0 ? <p> <b> {inventory?.name} </b> <Tag color='green' onClick={() => { navigate(`/stocker/inventories/${inventory?.id}`) }}>{inventory?.code}</Tag> </p> : <b>Tất cả các kho</b>
                    }
                </Col>

            </Row>
            <Row>
                <Col span={6}>
                    <p>Nhà cung cấp:</p>
                </Col>
                <Col span={18}>
                    {filter.supplierId > 0 ? <p> <b> {supplier?.name} </b> <Tag color='green' onClick={() => { navigate(`/supplier/details/${supplier?.id}`) }}>{supplier?.code}</Tag> </p> : <b>Tất cả </b>
                    }
                </Col>

            </Row>
        </Paper>
    )
}
export default CardDetails