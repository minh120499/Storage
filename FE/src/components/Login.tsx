import { useMutation } from "@tanstack/react-query";
import { Form, Image, Input, Spin } from "antd";
import axios from "axios";
// import Swal from "sweetalert2";
import { ILoginData } from "../interface";
import Button from "../UI/Button";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const Login: React.FC = () => {
  const [loginForm] = Form.useForm();
  const loginSubmit = useMutation( async (loginData: ILoginData) => {
    return (await axios.post("http://localhost:8080/api/account/login", loginData)).data;
  });

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: any) => {
    const { username, password } = loginForm.getFieldsValue();
    loginSubmit.mutate({ username, password });
  };

  if(loginSubmit?.data) {
    console.log(loginSubmit.data);
  }
  

  return (
    <>
      <div
        className=" flex justify-center items-center h-screen w-screen gap-5 shadow-black"
        style={{ background: "#f0f8ff" }}
      >
        {/* {loginSubmit.isLoading ? (
          <Spin />
        ) : loginSubmit.isError ? (
          "flas"
        ) : loginSubmit.data ? (
          "loginSubmit.data"
        ) : (
          ""
        )} */}
        <div className=" shadow-md">
          <Image
            className="w-max rounded-xl "
            style={{ height: 413, objectFit: "contain" }}
            src="https://img.freepik.com/free-vector/logistic-workers-carrying-boxes-with-loaders_74855-6541.jpg?w=900&t=st=1661854951~exp=1661855551~hmac=6de857e7e90e83f15098dbe800212e54cb9c8f448e246ef4c81ebe22ee7f2a8d"
          />{" "}
        </div>
        <Form
          className="relative h-max w-max p-10 self-center bg-white rounded-3xl  shadow-md"
          form={loginForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 30 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item>
            <h2>Đăng nhập</h2>
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Hãy nhập tài khoản!" }]}
            initialValue="minh"
          >
            <Input
              className="pl-3"
              prefix={<PersonIcon style={{ color: "#1890ff" }} />}
              placeholder="Nhập user name"
              title="Nhập user name"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
            initialValue="minh"
          >
            <Input.Password
              className="pl-3"
              prefix={<VpnKeyIcon style={{ color: "#1890ff" }} />}
              placeholder="Nhập password"
              title="Nhập password"
            />
          </Form.Item>

          <Form.Item
          // wrapperCol={{ span: 30 }}
          >
            <Button loading={loginSubmit?.isLoading} type="primary" htmlType="submit" className="w-full m-0">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
