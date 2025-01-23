import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/configureStore";
import { fetchUserProfileRequest } from "@/store/login/userSlice";
import {
  fetchProjectByUserId,
  editProject,
  removeProject,
  setPage,
  setLimit,
  setKeyword,
  resetProjects,
} from "../store/project/projectSlice";
import { AppDispatch } from "../store/configureStore";
import AntDTable from "../components/Table";
import Header from "../components/Header";
import InputSearch from "../components/InputSearch";
import { format } from "date-fns";
import { Form, Input, Select, Popconfirm, Typography } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Projects } from "../container/type";
import ModelProject from "../components/ModelProject";
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

  inputNode = <Input className="w-full" />;

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

const ProjectPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const { projects, page, limit, totalProjects, totalPages, keyword } =
    useSelector((state: RootState) => state.projects);
  useEffect(() => {
    dispatch(fetchUserProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(fetchProjectByUserId(userInfo._id));
    }
  }, [dispatch, userInfo, page, limit, keyword]);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Projects) => record._id === editingKey;

  const edit = (record: Projects) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id || null);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (_id: string) => {
    try {
      const row = (await form.validateFields()) as Partial<Projects>;
      dispatch(editProject({ _id, updates: row }));
      setEditingKey("");
    } catch (errInfo) {
      console.error("Validation Failed:", errInfo);
    }
  };

  const handleRemoveProject = (projectId: string) => {
    dispatch(removeProject(projectId));
  };

  const columnsProject = [
    {
      title: "Project",
      dataIndex: "Project",
      editable: true,
      render: (text: string) => (
        <span className="block text-black">{text}</span>
      ),
    },
    {
      title: "Name",
      dataIndex: "Name",
      editable: true,
      render: (text: string) => (
        <span className="block text-black">{text}</span>
      ),
    },
    {
      title: "Owner",
      dataIndex: "Owner",
      editable: true,
      render: (text: string) => (
        <span className="block text-black">{text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "Date",
      editable: true,
      render: (date: string) => {
        const formattedDate = format(new Date(date), "MMMM dd, yyyy");
        return <span className="block text-black">{formattedDate}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (_: any, record: Projects) => {
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
              title="Are you sure to delete this project?"
              onConfirm={() => handleRemoveProject(record._id!)}
            >
              <DeleteOutlined className="text-red-600" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columnsProject.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Projects) => ({
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
    if (userInfo && userInfo._id) {
      dispatch(fetchProjectByUserId(userInfo._id));
    }
  };
  const handleSearch = (value: string) => {
    dispatch(setKeyword(value));
    dispatch(setPage(1));
  };

  const resetData = () => {
    dispatch(resetProjects());
    dispatch(setKeyword(""));
    dispatch(setPage(1));
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
                Manage and track your projects efficiently
              </div>
            </div>
            {/* Button for Creating Project */}
            {userInfo && <ModelProject userId={userInfo._id} />}
          </div>
          <div>
            <InputSearch
              text="project"
              handleSearch={handleSearch}
              resetData={resetData}
            />
          </div>

          {/* Project Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3">
            {userInfo && (
              <AntDTable
                Editable={EditableCell}
                data={projects}
                columns={mergedColumns}
                form={form}
                page={page}
                current={page}
                limit={limit}
                total={totalProjects}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
