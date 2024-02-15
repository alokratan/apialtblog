import React, { useState, useEffect } from "react";
import { BASEURL } from "../../Burl";
import axios from "axios";
const ViewComment = ({onLogout }) => {


  useEffect(()=>{
    handlegetcommentfn();
    // console.log("isopen",isOpen);
    

  },[])
  
 const handlegetcommentfn = async (id) => {
    console.log("my modal comment:",id)
    try {
      const res = await axios.get(`${BASEURL}/comment/blog/${id}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="bg-white fixed z-100 p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">View Comments</h2>

        <div className="flex justify-end">
          {/* <button onClick={onClose} className="mr-2 px-4 py-1 bg-gray-300 hover:bg-gray-400">
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewComment;
