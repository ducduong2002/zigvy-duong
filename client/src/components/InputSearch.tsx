import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
interface InputSearchProps {
  text: string;
  handleSearch: (value: string) => void;
  resetData: () => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
  text,
  handleSearch,
  resetData,
}) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      resetData();
    }
  };
  const onSearchClick = () => {
    handleSearch(inputValue);
  };
  return (
    <div className="relative w-full mt-2">
      <Input
        size="large"
        placeholder={`Search ${text}`}
        prefix={
          <SearchOutlined
            onClick={onSearchClick}
            className="hover:text-gray-500 hover:scale-110 transition-all duration-200 mr-2 text-xl"
          />
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onInputChange}
        allowClear
      />
    </div>
  );
};

export default InputSearch;
