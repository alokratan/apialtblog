import React from "react";

const Wait = () => {
 

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="bg-white flex flex-col justify-center py-3 px-6 items-center fixed rounded-md">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black"></div>
  
        <h2 className="text-xl py-2 font-bold">Please Wait</h2>
        
      </div>
    </div>
  );
};

export default Wait;
