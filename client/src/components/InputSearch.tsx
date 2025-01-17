import "../assets/preview/stylesheets/css/Homepage.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
interface InputSearchProps {
    onSearch: (searchText: string) => void;
  }
  const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    };
  return (
    <div className="relative w-full mt-2">
      <Input
        size="large"
        placeholder="Search tasks"
        prefix={<SearchOutlined />}
        className="w-full"
        onChange={handleSearch}
      />
    </div>
  );
};

export default InputSearch;
