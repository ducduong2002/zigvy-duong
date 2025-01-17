import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-5 right-5 w-96 p-4 rounded-md text-white shadow-lg z-50 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <p className="text-center">{message}</p>
    </div>
  );
};

export default Toast;
