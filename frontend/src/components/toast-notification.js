import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  const showToast = (message, type) => {
    toast(message, { type });
  };

  return (
    <div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Notification;
