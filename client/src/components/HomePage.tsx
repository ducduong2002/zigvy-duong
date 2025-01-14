import "../assets/preview/stylesheets/css/Homepage.css";
import {
  BellOutlined,
  UserOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
  CloseOutlined,
  MenuOutlined,
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
  Modal,
  Select
} from "antd";
import { useState } from "react";
import type { TableProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { DataTypeTask, EditableCellProps } from "@/container/type";
// {=========================================================================================================}

const originData = Array.from({ length: 10 }).map<DataTypeTask>((_, i) => ({
  key: i.toString(),
  task: `task ${i}`,
  priority: ``,
  status: ``,
  date: `${i}-1-2025`,
}));

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

  const { Option } = Select;

  const [data, setData] = useState<DataTypeTask[]>(originData);

  const [editingKey, setEditingKey] = useState("");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const isEditing = (record: DataTypeTask) => record.key === editingKey;

  const edit = (record: Partial<DataTypeTask> & { key: React.Key }) => {
    form.setFieldsValue({ task: "", priority: "", status: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields() // Start validating the fields in the form
      .then((values: Omit<DataTypeTask, "date">) => {
        // When all fields are valid
        const date = new Date().toISOString(); // Generate the current date (ISO 8601 format)
        const taskData: DataTypeTask = { ...values, date }; // Combine form data with the current date
        console.log("Task Data:", taskData); // Log the task data, now including the date
        setIsModalVisible(false); // Close the modal after clicking OK
        form.resetFields(); // Reset all form fields back to their initial state
      })
      .catch((info) => {
        // If there is a validation error
        console.error("Validation Failed:", info); // Log the validation error if the form is invalid
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataTypeTask;

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
      render: (_: any, record: DataTypeTask) => {
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
           
          >
            <FormOutlined className="m-2"  onClick={() => edit(record)}/>
            <DeleteOutlined className="tb-bt-delete" />
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps<DataTypeTask>["columns"] = columns.map(
    (col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataTypeTask) => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }
  );

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
            <Button className="bt-create" onClick={showModal}>
              {<PlusOutlined className="m-1" />}
              New Task
            </Button>
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
              <Table<DataTypeTask>
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
      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            task: "",
            priority: "",
            status: "",
          }}
        >
          <Form.Item
            label="Task"
            name="task"
            rules={[{ required: true, message: "Please input the task!" }]}
          >
            <Input placeholder="Enter your task" />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "Please select the priority!" }]}
          >
            <Select placeholder="Select priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select placeholder="Select status">
              <Option value="Pending">Pending</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;