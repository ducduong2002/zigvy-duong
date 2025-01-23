import React from "react";
import { Input as AntdInput} from "antd";

interface InputProps {
  label?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number" | "name";
  required?: boolean;
  className?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
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
        <AntdInput.Password
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`border p-2 rounded-md ${className}`}
        />
      ) : (
        <AntdInput
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

export default Input;
