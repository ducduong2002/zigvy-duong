import "../assets/preview/stylesheets/css/Homepage.css";
import {
  BellOutlined,
  UserOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
  CloseOutlined,
  MenuOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
} from "antd";
import { useState } from "react";
import type { TableProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
// {=========================================================================================================}

interface DataType {
  key: string;
  task: string;
  priority: string;
  status: string;
  date: string;
}
interface user {
  userId: string;
  name: string;
  email: string;
  token: string;
}

const originData = Array.from({ length: 10 }).map<DataType>((_, i) => ({
  key: i.toString(),
  task: `task ${i}`,
  priority: ``,
  status: ``,
  date: `${i}-1-2025`,
}));

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

// {=========================================================================================================}

const HomePage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: DataType) => record.key === editingKey;
  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ task: "", priority: "", status: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const user = useSelector((state: RootState) => state.user.user);

  console.log("User data in Home page:", user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      width: "30%",
      editable: true,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: "15%",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "20%",
      editable: true,
    },
    {
      title: "Due Date",
      dataIndex: "date",
      width: "20%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
          <FormOutlined className="m-2" />
          <DeleteOutlined className="tb-bt-delete" />
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps<DataType>["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // {==================================================================================================================}
  return (
    <div>
      {/* header---------------------------------------------------------------------------------- */}
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
      <div className="flex justify-between items-center px-4 py-4 md:px-20">
        {/* Logo */}
        <div className="text-xl font-bold">TaskFlow</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <div>Dashboard</div>
          <div>Projects</div>
          <div>Calendar</div>
          <div>Reports</div>
          <div>
            <BellOutlined />
          </div>
          <div>
            <Avatar size={40} icon={<UserOutlined />} />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          {/* <div className="text-lg font-bold flex-grow text-center">My Task</div> */}
          <div>
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="ml-4 text-xl focus:outline-none"
          >
            {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="space-y-4 px-6 py-4">
            <li className="text-lg">Dashboard</li>
            <li className="text-lg">Projects</li>
            <li className="text-lg">Calendar</li>
            <li className="text-lg">Reports</li>
          </ul>
        </div>
      )}
    </nav>
      {/* container---------------------------------------------------------------------------------- */}
      <div className="bg-gray-200 w-full pt-20 pb-8">
        <div className="w-full px-20">
          <div className="flex justify-between items-center">
            <div>
              <h2>My Tasks</h2>
              <div>Manage and track your tasks efficiently</div>
            </div>
            <button className="bt-create" >
            {<PlusOutlined className="m-1" />}
              New Task
            </button>
          </div>
          {/* search---------------------------------------------------------------------------------- */}
          <div className="relative w-full mt-2">
            <Input
              size="large"
              placeholder="Search tasks, projects, and more..."
              prefix={<SearchOutlined />} 
              className="w-full" 
            />
          </div>
          {/* table---------------------------------------------------------------------------------- */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3">
            <Form form={form} component={false}>
              <Table<DataType>
                components={{
                  body: { cell: EditableCell },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{ onChange: cancel }}
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
