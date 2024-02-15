import React, { useState, useEffect } from "react";

const DeleteModal = ({ isOpen, onClose, onLogout }) => {
  const [textvalue, setTextvalue] = useState('');
  const [deldone, setDeldone] = useState(false);

  useEffect(() => {
    console.log("val", textvalue);
    if (textvalue === "DELETE") {
      setDeldone(true);
    } else {
      setTextvalue(null)
      setDeldone(false);
    }
  }, [textvalue]);

  const handleChange = (e) => {
    setTextvalue(e.target.value);
  };

  const notdone = () => {
    alert("Plese type DELETE to confirm.")
    console.log("error");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="bg-white fixed z-100 p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">DELETE ACCOUNT</h2>
        <p className="mb-4">Are you sure you want to delete your account?</p>
        <p className="my-1 font-semibold text-sm">
          Please type <span className="text-red-600 font-bold">DELETE</span> to confirm.
        </p>
        <input
          className="bg-slate-200 w-full font-semibold rounded-md mb-3 px-2 py-2"
          onChange={handleChange}
          placeholder="DELETE"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-1 bg-gray-300 hover:bg-gray-400">
            Cancel
          </button>
          {deldone ? (
            <button onClick={onLogout} className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white">
              Delete
            </button>
          ) : (
            <button onClick={notdone} className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
