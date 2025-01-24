// OptionCustomize.tsx
import React from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
interface OptionProp {
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  className?: string
}

const AntDOption: React.FC<OptionProp> = ({
  options,
  placeholder,
  onChange,
  value,
  className,
}) => {

    const handleChange = (value: string) => {
      onChange(value);
    };
  return (
    <div>
      <Select
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ width: 130 }}
        allowClear
        className="mr-2 mt-2"
      >
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default AntDOption;
