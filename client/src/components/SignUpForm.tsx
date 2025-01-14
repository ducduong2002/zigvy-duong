import "../assets/preview/stylesheets/css/Login.css";
import { Button,  Form, Input,  } from "antd";
import { Register } from "../container/type";

interface SignUpFormProps {
  onFinish: (values: Register) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onFinish }) => (
  <>
    <h2 className="text-left text-3xl font-semibold mb-4">Create Account</h2>
    <Form name="sign_up" onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your Name!" }]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>
  
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your Password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  </>
);
export default SignUpForm;
