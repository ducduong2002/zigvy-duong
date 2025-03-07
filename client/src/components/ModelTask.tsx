import React, { useState } from "react";
import { Form, Modal, Select, } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AppDispatch } from "../store/configureStore";
import { useDispatch } from "react-redux";
import { addTask } from "../store/task/taskSlice";
import InputCustom from "./Input"
import ButtonCustom from "./Button";
import Toast from "./Toast";

interface TaskIdProp {
  userId: string;
}

const ModelTask: React.FC<TaskIdProp> = ({ userId }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [toast, setToast] = useState({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddTask = async () => {
    try {
      const values = await form.validateFields();
      const newTask = {
        ...values,
        userId: userId || "default_user_id",
        date: new Date().toISOString(),
      };

      await dispatch(addTask(newTask)).unwrap();
      showToast("Create new task successfully...", "success");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      if (error.name === "Error") {
        showToast("Please fill in all fields.", "error");
      } else {
        showToast("Create failed mission, please try again.", "error");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
       <ButtonCustom
        className="bg-blue-700 text-white flex rounded-lg"
        onClick={showModal}
        text="New Task"
        icon={< PlusOutlined className="mt-1"/>}
      />
      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleAddTask}
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
            <InputCustom placeholder="Enter your task" required />
    
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

      <Toast
        message={toast.message}
        type={toast.type as "success" | "error"}
        isVisible={toast.isVisible}
      />
    </div>
  );
};

export default ModelTask;
