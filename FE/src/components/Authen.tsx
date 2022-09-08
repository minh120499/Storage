import {Outlet} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {useLocation, useNavigate} from "react-router-dom";
import { Button, Result } from 'antd';

const Authen = () => {
    // const navigate = useNavigate();
    // const auth = useSelector((state: RootState) => state?.user?.authorities)
    // const roles = ["admin", "stocker", "staff"]
    // const { pathname } = useLocation();
    // let page = pathname?.slice(1)
    // page = page?.slice(0,page.indexOf("/"))
    // console.log(auth, roles, page, pathname)
    // // console.log(!roles.includes(page), !auth.includes(page))
    // if(!roles?.includes(page) || auth.includes('admin')) {
    //     return <Outlet />
    // }
    // if(!auth?.includes(page)) {
    //     return <Result
    //         status="403"
    //         title="403"
    //         subTitle="Xin lỗi, bạn không đủ quyền truy cập trang này."
    //         extra={<Button onClick={() => navigate("/")} type="primary">Back Home</Button>}
    //     />
    // }

    return <Outlet />
}

export default Authen;