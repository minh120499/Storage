import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PageResult = (props: any) => {
  const navigate = useNavigate();

  return (
    <Result
      {...props}
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không đủ quyền truy cập trang này."
      extra={
        <Button onClick={() => navigate("/")} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default PageResult;
