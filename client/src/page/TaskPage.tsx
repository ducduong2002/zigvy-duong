import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/configureStore";
import { fetchUserProfileRequest } from "@/store/login/userSlice";
import {
  fetchTaskByUserId,
  editTask,
  removeTask,
  setPage,
  setLimit,
  setKeyword,
  resetTasks,
  setFilterStatus,
  setPriority,
  setFilterPriority,
} from "../store/task/taskSlice";
import { AppDispatch } from "../store/configureStore";
import AntDTable from "../components/Table";
import Header from "../components/Header";
import InputSearch from "../components/InputSearch";
import { format } from "date-fns";
import { Form, Input, Select, Popconfirm, Typography, Skeleton } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Tasks } from "../container/type";
import ModelTask from "../components/ModelTask";
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
  let inputNode: any;
  if (dataIndex === "priority" || dataIndex === "status") {
    inputNode = (
      <Select className="w-full z-50">
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

const TaskPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const {
    tasks,
    status,
    page,
    limit,
    totalTasks,
    totalPages,
    keyword,
    priority,
  } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchUserProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(fetchTaskByUserId(userInfo._id));
    }
  }, [dispatch, priority, status, userInfo, page, limit, keyword]);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Tasks) => record._id === editingKey;

  const edit = (record: Tasks) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id || null);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (_id: string) => {
    try {
      const row = (await form.validateFields()) as Partial<Tasks>;
      dispatch(editTask({ _id, updates: row }));
      setEditingKey("");
    } catch (errInfo) {
      console.error("Validation Failed:", errInfo);
    }
  };

  const handleRemoveTask = (taskId: string) => {
    dispatch(removeTask(taskId));
  };

  const columnsTask = [
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
        return (
          <span className={`py-1 px-3 rounded-full ${colorClass}`}>{text}</span>
        );
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
        return (
          <span className={`py-1 px-3 rounded-full ${colorClass}`}>{text}</span>
        );
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
      title: "Action",
      dataIndex: "Action",
      render: (_: any, record: Tasks) => {
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
              disabled={editingKey !== null && editingKey == record._id}
              onClick={() => edit(record)}
            >
              <FormOutlined className="m-4" />
            </Typography.Link>

            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => handleRemoveTask(record._id!)}
            >
              <DeleteOutlined className="text-red-600" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columnsTask.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Tasks) => ({
        record,
        inputType: col.dataIndex === "date" ? "text" : col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handlePaginationChange = (newPage: number, newLimit: number) => {
    dispatch(setPage(newPage));
    dispatch(setLimit(newLimit));
  };

  const handleSearch = (value: string) => {
    dispatch(setKeyword(value));
    dispatch(setPage(1));
  };

  const resetData = () => {
    dispatch(resetTasks());
    dispatch(setKeyword(""));
    dispatch(setPage(1));
  };

  const handleStatusChange = (value: string) => {
    dispatch(setPage(1));
    dispatch(setFilterStatus(value));
  };
  const handlePriorityChange = (value: string) => {
    dispatch(setPage(1));
    dispatch(setFilterPriority(value));
  };

  return (
    <div>
      {/* Header */}
      <Header />
      {/* Container */}
      <div className="bg-gray-200 w-full pt-20 pb-8">
        <div className="w-full px-10 lg:px-20">
          <div className="flex justify-between items-center">
            {/* Search Bar */}
            <div>
              <h1 className="text-2xl font-semibold">
                Welcome, {userInfo ? userInfo.name : ""}
              </h1>
              <div className="text-gray-600">
                Manage and track your tasks efficiently
              </div>
            </div>
            {/* Button for Creating Task */}
            {userInfo && <ModelTask userId={userInfo._id} />}
          </div>
          <div>
            <InputSearch
              text="task"
              handleSearch={handleSearch}
              resetData={resetData}
            />

            <div className="flex">
              <div>
                <Select
                  value={status}
                  placeholder="filter Status"
                  onChange={handleStatusChange}
                  style={{
                    width: 120,
                    marginBottom: 5,
                    marginRight: 16,
                    marginTop: 5,
                  }}
                  allowClear
                >
                  <Option value="Pending">Pending</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="In Progress">In Progress</Option>
                </Select>
              </div>
              <div>
                <Select
                  value={priority}
                  placeholder="filter priority"
                  onChange={handlePriorityChange}
                  style={{
                    width: 120,
                    marginBottom: 5,
                    marginRight: 16,
                    marginTop: 5,
                  }}
                  allowClear
                >
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </div>
            </div>
          </div>

          {/**/}

          {/* Task Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3">
            {userInfo && (
              <AntDTable
                Editable={EditableCell}
                data={tasks}
                columns={mergedColumns}
                form={form}
                page={page}
                current={page}
                limit={limit}
                total={totalTasks}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
