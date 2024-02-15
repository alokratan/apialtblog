import React from "react";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="bg-white fixed z-100 p-6 rounded-md ">
        <h2 className="text-xl font-bold mb-4">LOGOUT</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-1  bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-1  bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
