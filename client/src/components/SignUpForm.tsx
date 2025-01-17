import "../assets/preview/stylesheets/css/Login.css";
import { Button, Form, Input } from "antd";
import { Register } from "../container/type";
import { useState } from "react";

interface SignUpFormProps {
  onFinish: (values: Register) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onFinish }) => {
  const [passwordStrength, setPasswordStrength] = useState<"Weak" | "Medium" | "Strong" | "">("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const checkPasswordStrength = (password: string): "Weak" | "Medium" | "Strong" | "" => {
    if (!password) return "";
    if (password.length < 6) return "Weak"; 
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[@$!%*?&#]/.test(password)) {
      return "Strong"; 
    }
    return "Medium"; 
  };


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };


  return (
    <>
      <h2 className="text-left text-3xl font-semibold mb-4">Create Account</h2>
      <Form
        name="sign_up"
        onFinish={onFinish}
        onValuesChange={(changedValues) => {
          if (changedValues.password) {
            setPasswordStrength(checkPasswordStrength(changedValues.password));
          }
        }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            {
              validator: (_, value) =>
                value && !validateEmail(value)
                  ? Promise.reject(new Error("Invalid email format."))
                  : Promise.resolve(),
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            {
              validator: (_, value) => {
                const strength = checkPasswordStrength(value);
                if (strength === "Weak") {
                  return Promise.reject(
                    new Error("Password is too weak! Include uppercase, numbers, and special characters.")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {passwordStrength && (
          <div
            style={{
              marginBottom: "16px",
              color: passwordStrength === "Strong" ? "green" : passwordStrength === "Medium" ? "orange" : "red",
            }}
          >
            Password Strength: {passwordStrength}
          </div>
        )}

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
};

export default SignUpForm;
