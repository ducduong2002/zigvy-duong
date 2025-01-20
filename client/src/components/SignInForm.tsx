import "../assets/preview/stylesheets/css/Login.css";
import { Checkbox, Form, Input } from "antd";
import { useState } from "react";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FaceBookButton";
import IPButton from "./iPButton";
import ButtonCustom from "./ButtonCustom";
import InputCustom from "./InputCustom";
import { Login } from "@/container/type";
interface SignInFormProps {
  onFinish: (values: Login) => Promise<void>;
}

const SignInForm: React.FC<SignInFormProps> = ({ onFinish }) => {
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: Login) => {
    setLoading(true);
    await onFinish(values);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleButtonClick = (buttonLabel: string) => {
    console.log(`Button ${buttonLabel} clicked`);
  };

  return (
    <>
      <h2 className="text-left text-3xl font-semibold mb-4">
        Sign in to Account
      </h2>
      <Form
        name="sign_in"
        initialValues={{ remember: true }}
        onFinish={handleFinish}
      >
        <label className="block text-lg">Email Address</label>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <InputCustom
            placeholder="name@company.com"
            type="email"
            required
          />
        </Form.Item>
        <label className="block text-lg">Password</label>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <InputCustom 
            placeholder="Password" 
            type="password" 
            required />
        </Form.Item>

        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a href="#" className="float-right text-blue-500">
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <ButtonCustom
            text="Log in"
            loading={loading}
            htmlType="submit"
            block
            className="rounded-lg"
          />
        </Form.Item>
        <div className="my-4 text-center">
          <span>Or continue with</span>
        </div>

        <div className="flex flex-row justify-center">
          <GoogleButton onClick={() => handleButtonClick("Google")} />
          <IPButton onClick={() => handleButtonClick("IP")} />
          <FacebookButton onClick={() => handleButtonClick("Facebook")} />
        </div>
      </Form>
    </>
  );
};

export default SignInForm;
