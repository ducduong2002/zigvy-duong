import React from "react";
import { Input } from "antd";

interface InputCustomProps {
  label?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number" | "name";
  required?: boolean;
  className?: string;
  rules?: any;
}

const InputCustom: React.FC<InputCustomProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  className = "",
}) => {
  return (
    <div className="input-custom-container">
      <label className="block text-lg">{label}</label>
      {type === "password" ? (
        <Input.Password
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`border p-2 rounded-md ${className}`}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`border p-2 rounded-md ${className}`}
        />
      )}
    </div>
  );
};

export default InputCustom;
