import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};

const Home = () => (
  <Select
    dropdownStyle={{
        height: "100px",
        // width: "10011x"
    }}
    defaultValue="lucy"
    style={{
      width: 200,
    }}
    onChange={handleChange}
  >
    <OptGroup className="h-10 w-10" label="Manager">
      <Option id={1} value="jack">Jack</Option>
      <Option id={2} value="lucy">Lucy</Option>
      <Option id={1} value="jack">Jack</Option>
      <Option id={2} value="lucy">Lucy</Option>
      <Option id={1} value="jack">Jack</Option>
      <Option id={2} value="lucy">Lucy</Option>
      <Option id={1} value="jack">Jack</Option>
      <Option id={2} value="lucy">Lucy</Option>
    </OptGroup>
    {/* <OptGroup label="Engineer">
      <Option value="Yiminghe">yiminghe</Option>
    </OptGroup> */}
  </Select>
);

export default Home;