import styled from "@emotion/styled";
import { Button } from "antd";

const B = (props: any) => <Button {...props} />;

const Buttonn = styled(B)`
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
