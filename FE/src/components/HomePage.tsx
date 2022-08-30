// import { Input, Table } from "antd";
// import { useState } from "react";
// import Tablee from "../UI/Table";
import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import { Button } from "antd";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";

type L = {
  "cancel": string
}

const color = {
  cancel: "#d72503",
};

const H1 = (props: any) => {
  console.log(props.mode);
  console.log(color[props?.mode as keyof L]);
  
  return (
    <Button
      css={css`
        background-color: ${color[props?.mode as keyof L]};
        &:hover {
          color: ${color[props?.mode as keyof L]};
        }
      `}
      {...props}
    />
  );
};
const Buttonn = styled(H1)`
  color: #fff;
  `;
  // border-color: #1890ff;
  // background: #1890ff;
  // &:hover {
  //   background: #40a9ff;
  //   border-color: #40a9ff;
  //   color: #fff;
  // }
  // &:active {
  //   color: #fff;
  //   border-color: #1890ff;
  //   background: #1890ff;
  // }
  export default function HomePage() {
  return (
    <div>
      <Buttonn mode="cancel" color="lightgreen">
        This is lightgreen.
      </Buttonn>
      <Buttonn color="lightgreen">This is lightgreen.</Buttonn>
    </div>
  );
}
