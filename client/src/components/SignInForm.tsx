import "../assets/preview/stylesheets/css/Login.css";
import { Button, Checkbox, Form, Input, Row, Col, Radio } from "antd";
import {
  GoogleOutlined,
  AppleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Login } from "@/container/type";

interface SignInFormProps {
  onFinish: (values: Login) => void;
}


const SignInForm: React.FC<SignInFormProps> = ({
  onFinish,
}) => (
  <>
    <h2 className="text-left text-3xl font-semibold mb-4">
      Sign in to Account
    </h2>
    <Form name="sign_in" initialValues={{ remember: true }} onFinish={onFinish}>
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
        <Button block type="primary" htmlType="submit">
          Log in
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
export default SignInForm;
