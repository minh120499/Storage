import { Button, Form, Input } from "antd";
import { useForm } from 'react-hook-form'

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div 
        className=" flex justify-center items-center"
        style={{"backgroundImage": "url('/loginBg.svg')", "backgroundSize": "cover"}}
    >
      <Form
        className="relative h-max w-max p-10 rounded-md"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button 
            style={{"background": "radial-gradient(100% 1111.11% at 100% 51.11%,#00d8b0 0,#00de92 100%)"}}
            type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
