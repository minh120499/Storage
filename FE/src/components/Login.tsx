import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input,Spin  } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { ILoginData } from "../interface";


const Login: React.FC = () => {
  const [loginForm] = Form.useForm();
  const loginSubmit = useMutation((loginData: ILoginData) => {
    return axios.post("http://localhost:8080/api/account/login", loginData);
  });

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: any) => {
    const { username, password } = loginForm.getFieldsValue();
    console.log(username, password);

    loginSubmit.mutate({ username, password });

    console.log(loginSubmit.isLoading);

  };

  return (
    <>
    <div
      className=" flex justify-center items-center h-screen w-screen"
      style={{
        backgroundImage: "url('/loginBg.svg')",
        backgroundSize: "cover",
      }}
    >
      {loginSubmit.isLoading ? <Spin /> : loginSubmit.isError ? 'flas' : loginSubmit.data ? 'loginSubmit.data' : ''}
      <Form
        className="relative h-max w-max p-10 rounded-md"
        form={loginForm}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          initialValue="adminn"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          initialValue="admin"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            style={{
              background:
                "radial-gradient(100% 1111.11% at 100% 51.11%,#00d8b0 0,#00de92 100%)",
            }}
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default Login;
