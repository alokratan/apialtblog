import React from "react";

const Serverlive = ({ isOpen, reloadpage}) => {
  if (!isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="bg-white fixed z-100 flex justify-center flex-col items-center p-6 rounded-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Make Sure Server Is Live..</h2>
        <button className="bg-slate-800 text-white px-4 py-2 font-bold" onClick={reloadpage}>Reload Page</button>
       
      </div>
    </div>
  );
};

export default Serverlive;
