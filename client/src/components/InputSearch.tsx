import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

interface InputSearchProps {
 
}

const InputSearch: React.FC<InputSearchProps> = ({ }) => {


  return (
    <div className="relative w-full mt-2">
      <Input
        size="large"
        placeholder="Search tasks"
        prefix={<SearchOutlined />}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
};

export default InputSearch;
