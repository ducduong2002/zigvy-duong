import "../assets/preview/stylesheets/css/Homepage.css";
import {
  BellOutlined,
  UserOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import type { TableProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
// {=========================================================================================================}

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}
interface user {
  userId: string;
  name: string;
  email: string;
  token: string;
}

const originData = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i.toString(),
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
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
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const user = useSelector((state: RootState) => state.user.user); // Adjust based on your actual state structure
  
  // Log the user data when the component mounts
  console.log("User data in Home page:", user);


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
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "40%",
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
            Edit
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
      <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-20 py-4 bg-white shadow-md">
        <div className="text-xl font-bold">TaskFlow</div>
        <div className="flex items-center space-x-6">
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
      </nav>
      {/* container---------------------------------------------------------------------------------- */}
      <div className="bg-gray-200 w-full pt-20 pb-8">
        <div className="w-full px-20">
          <div className="flex justify-between items-center">
            <div>
              <h2>My Tasks</h2>
              <div>Manage and track your tasks efficiently</div>
            </div>
            <button className="bt-create bg-gray-600">
              <PlusOutlined />
              <div>New Task</div>
            </button>
          </div>
          {/* search---------------------------------------------------------------------------------- */}
          <div className="relative w-full mt-2">
            <Input
              size="large"
              placeholder="Search tasks, projects, and more..."
              prefix={<SearchOutlined />} // Adds the magnifying glass icon inside the input
              className="w-full" // Ensures the search bar takes the full width
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
