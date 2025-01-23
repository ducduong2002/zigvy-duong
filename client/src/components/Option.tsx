// OptionCustomize.tsx
import React from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import {

    setStatus,
  } from "../store/task/taskSlice";
interface OptionProp {
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}

const AntDOption: React.FC<OptionProp> = ({
  options,
  placeholder,
  onChange,
  value,
}) => {
    const dispatch = useDispatch();

    const handleChange = (value: string) => {
      onChange(value); // Khi chọn một giá trị mới, gọi callback onChange từ Home.tsx
      dispatch(setStatus(value)); // Dispatch action để cập nhật Redux store
    };
  return (
    <div>
      <Select
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ width: 120 }}
        allowClear
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
