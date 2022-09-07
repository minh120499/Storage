// import { DownOutlined } from "@ant-design/icons";
import { Col, Form, Row, Select } from "antd";
import Search from "antd/lib/input/Search";

//datepicker

const FilterBox = (props: any) => {
  const onSearch = (value: string) => {
    console.log(filterForm.getFieldsValue());
  };
  const [filterForm] = Form.useForm();

  return (
    <div>
      <Form form={filterForm}>
        <Row>
          <Col span={4}>
            <Form.Item name="filterName" initialValue="name" className="m-0">
              <Select defaultValue="code" className="bg-pink">
                <Select.Option value="name">Tìm theo tên</Select.Option>
                <Select.Option value="code">Tìm theo code</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item name="filterValue" className="m-0">
              <Search
                placeholder="Nhập để tìm kiếm"
                onSearch={onSearch}
                enterButton
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FilterBox;
