import "../assets/preview/stylesheets/css/Login.css";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import {
  GoogleOutlined,
  AppleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Login } from "@/container/type";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons"; // Import the icon

interface SignInFormProps {
  onFinish: (values: Login) => Promise<void>;
}

const SignInForm: React.FC<SignInFormProps> = ({ onFinish }) => {
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: Login) => {
    setLoading(true);
    await onFinish(values); // Call the onFinish function passed via props
    // Simulate a delay of 5 seconds before stopping the loading spinner
    setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds delay
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
        <label>Email</label>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="name@company.com" />
        </Form.Item>
        <label>Password</label>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a href="#" className="float-right text-blue-500">
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loading} // Optional, but can still be kept if you want to show default loading spinner as well
            icon={loading ? <LoadingOutlined /> : null} // Display loading icon when loading
          >
            {!loading ? "Log in" : null}{" "}
            {/* Show "Log in" text only when not loading */}
          </Button>
        </Form.Item>

        <div className="line-container mb-4">
          <span>Or continue with</span>
        </div>

        <Row justify="center" gutter={16}>
          <Col span={8}>
            <Button
              icon={<GoogleOutlined />}
              size="large"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={8}>
            <Button
              icon={<AppleOutlined />}
              size="large"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={8}>
            <Button
              icon={<FacebookOutlined />}
              size="large"
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SignInForm;
