import styled from "@emotion/styled";
import { Button } from "antd";

const Buttonn = styled(Button)`
  color: #fff;
  border-color: #1890ff;
  background: #1890ff;
  &:hover {
    background: #40a9ff;
    border-color: #40a9ff;
    color: #fff;
  }
  &:active {
    color: #fff;
    border-color: #1890ff;
    background: #1890ff;
  }
`;

export default Buttonn;
