import React from "react";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface ButtonCustomProps {
  text: string;
  loading?: boolean; 
  onClick?: () => void; 
  icon?: React.ReactNode; 
  block?: boolean; 
  className?: string; 
  htmlType?: "button" | "submit" | "reset"; 
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  text,
  loading = false,
  onClick,
  icon,
  block = false,
  className = "",
  htmlType = "button",
}) => {
  return (
    <Button
      block={block}
      type="primary"
      htmlType={htmlType}
      loading={loading}
      icon={loading ? <LoadingOutlined /> : icon}
      className={`bg-blue-500 hover:bg-blue-600 text-white ${className}`}
      onClick={onClick}
    >
      {!loading ? text : null}
    </Button>
  );
};

export default ButtonCustom;
