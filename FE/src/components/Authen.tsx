import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const Authen = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userRoles = useSelector((state: RootState) => state?.user?.authorities);
  const auth = userRoles.every((r) => pathname.includes(r));

  if (userRoles?.includes("admin") || pathname.includes("home") || auth) {
    return <Outlet />;
  } else {
    return (
      <Result
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
  }
};

export default Authen;
