import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "warning", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down`}
    >
      {message}
    </div>
  );
};

export default Toast; 