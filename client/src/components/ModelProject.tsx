import React, { useState } from "react";
import { Form, Modal, } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AppDispatch } from "../store/configureStore";
import { useDispatch } from "react-redux";
import { addProject } from "../store/project/projectSlice";
import InputCustom from "./Input";
import ButtonCustom from "./Button";
import Toast from "./Toast";

interface TaskIdProp {
  userId: string;
}

const ModelCreate: React.FC<TaskIdProp> = ({ userId }) => {
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

  const handleAddProject = async () => {
    try {
      const values = await form.validateFields();
      const newTask = {
        ...values,
        userId: userId || "default_user_id",
        date: new Date().toISOString(),
      };

      await dispatch(addProject(newTask)).unwrap();
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
        text="New Project"
        icon={< PlusOutlined className="mt-1"/>}
      />
      <Modal
        title="Add New Project"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleAddProject}
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
            label="Project"
            name="Project"
            rules={[{ required: true, message: "Please input the task!" }]}
          >
            <InputCustom placeholder="Enter your task" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="Name"
            rules={[{ required: true, message: "Please input the task!" }]}
          >
            <InputCustom placeholder="Enter your task" />
          </Form.Item>
          <Form.Item
            label="Owner"
            name="Owner"
            rules={[{ required: true, message: "Please input the task!" }]}
          >
            <InputCustom placeholder="Enter your task" />
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

export default ModelCreate;
