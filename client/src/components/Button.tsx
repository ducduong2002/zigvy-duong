import React from "react";
import { Button as AntdButton} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface ButtonProps {
  text: string;
  loading?: boolean; 
  onClick?: () => void; 
  icon?: React.ReactNode; 
  block?: boolean; 
  className?: string; 
  htmlType?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({
  text,
  loading = false,
  onClick,
  icon,
  block = false,
  className = "",
  htmlType = "button",
}) => {
  return (
    <AntdButton
      block={block}
      htmlType={htmlType}
      loading={loading}
      icon={loading ? <LoadingOutlined /> : icon}
      className={`bg-blue-500 hover:bg-blue-600 text-white ${className}`}
      onClick={onClick}
    >
      {!loading ? text : null}
    </AntdButton>
  );
};

export default Button;
