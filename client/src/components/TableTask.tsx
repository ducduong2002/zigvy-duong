import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Popconfirm,
  Table,
  Typography,
  Select,
  Space,
} from "antd";
import {
  fetchTaskByUserId,
  editTask,
  removeTask,
} from "../store/task/taskSlice";
import { AppDispatch, RootState } from "../store/configureStore";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Task } from "../container/type";
import InputSearch from "./InputSearch";

const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode;
  if (dataIndex === "priority" || dataIndex === "status") {
    inputNode = (
      <Select className="w-full">
        {dataIndex === "priority" && (
          <>
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </>
        )}
        {dataIndex === "status" && (
          <>
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </>
        )}
      </Select>
    );
  } else {
    inputNode = <Input className="w-full" />;
  }

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

const TaskTable: React.FC<{ userId: string }> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  // const [filterPriority, setFilterPriority] = useState<string | undefined>(
  //   undefined
  // );
  // const [filterStatus, setFilterStatus] = useState<string | undefined>(
  //   undefined
  // );

  useEffect(() => {
    dispatch(fetchTaskByUserId(userId));
  }, [dispatch, userId]);

  const isEditing = (record: Task) => record._id === editingKey;

  const edit = (record: Task) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id || null);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (_id: string) => {
    try {
      const row = (await form.validateFields()) as Partial<Task>;
      dispatch(editTask({ _id, updates: row }));
      setEditingKey("");
    } catch (errInfo) {
      console.error("Validation Failed:", errInfo);
    }
  };

  const handleRemoveTask = (taskId: string) => {
    dispatch(removeTask(taskId));
  };
  
  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      editable: true,
      render: (text: string) => (
        <span className="block text-black">{text}</span>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      editable: true,
      render: (text: string) => {
        const colorClass =
          text === "Low"
            ? "bg-yellow-200 text-yellow-700 font-bold"
            : text === "Medium"
            ? "bg-green-300 text-emerald-700 font-bold"
            : "bg-red-200 text-rose-700 font-bold";
        return <span className={`py-1 px-3 rounded-full ${colorClass}`}>{text}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      editable: true,
      render: (text: string) => {
        const colorClass =
          text === "In Progress"
            ? "bg-yellow-200 text-yellow-700 font-bold"
            : text === "Completed"
            ? "bg-green-300 text-emerald-700 font-bold"
            : "bg-red-200 text-rose-700 font-bold";
        return <span className={`py-1 px-3 rounded-full ${colorClass}`}>{text}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      editable: true,
      render: (date: string) => {
        const formattedDate = format(new Date(date), "MMMM dd, yyyy");
        return <span className="block text-black">{formattedDate}</span>;
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: Task) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id!)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Cancel editing?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <Typography.Link
              disabled={editingKey !== "" && editingKey !== record._id}
              onClick={() => edit(record)}
            >
              <FormOutlined className="m-4" />
            </Typography.Link>

            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => handleRemoveTask(record._id!)}
              okText="Yes"
              cancelText="No"
            >
              <Typography.Link style={{ marginLeft: 8 }}>
                <DeleteOutlined className="tb-bt-delete" />
              </Typography.Link>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Task) => ({
        record,
        inputType: col.dataIndex === "date" ? "text" : col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          dataSource={tasks}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey="_id"
          pagination={{ onChange: cancel }}
          scroll={{ x: "max-content" }}
        />
      </Form>
    </div>
  );
};

export default TaskTable;
