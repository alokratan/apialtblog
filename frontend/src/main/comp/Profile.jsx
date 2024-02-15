import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { getuserdetails } from "../../apis/register";
import { urlgetuserprofile, urlsss } from "../../apis/urls";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navi = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("accessToken")) {
        navi("/signin");
      } else {
        toast.loading("Please Wait", { id: "1" });
        const userpersonal = await getuserdetails();
        console.log("all user data:", userpersonal);
        toast.success(userpersonal.message, { id: "1" });
        setUser(userpersonal.data);
      }
    };
    return () => fetchData();
  }, []);

  const deleteuser = async () => {
    toast.loading("Please Wait", { id: "1" });
    const res = await axios.delete(`${BASEURL}/altblog/user-blog/${user._id}`);
    console.log(res);
    toast.success("Account Deleted Successfully", { id: "1" });
  };

  const handleLogout = () => {
    // Perform your logout logic here
    // For simplicity, we'll just set the modal to close
    deleteuser();
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("userdata");

    setModalOpen(false);
    setTimeout(() => {
      navi("/signin");
    }, 2000);
  };

  return (
    <>
      <Toaster />
      <div className="bg-[url('/public/createblog.jpg')] h-screen overflow-y-scroll bg-no-repeat bg-fixed  bg-center  bg-cover ">
        {/* <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogout={handleLogout}
      /> */}
        <div className="bg-slate-900 sticky top-0  flex justify-between px-8 items-center py-6 md:w-full">
          <Link to={"/"} className="flex bg-black p-3 rounded-md ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <h3 className="text-white font-semibold pl-2">HOME</h3>
          </Link>
          <h1 className="text-xl sm:text-xl md:text-3xl lg:text-3xl  text-center capitalize text-white font-bold">
            ALTBLOGS
          </h1>
        </div>
        <div className="w-full flex flex-col pt-4 justify-center items-center ">
          <div className="lg:w-2/6 md:w-3/4 sm:w-full w-4/5  py-8 px-8 bg-white shadow-lg rounded-md flex flex-col justify-center  ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-xl sm:text-xl md:text-xl lg:text-xl text-center shadow-lg bg-slate-200  py-2 rounded-md font-bold leading-9 tracking-tight text-black">
                PERSONAL INFORMATION
              </h2>

              <div className="bg-white my-3 p-8 shadow-lg rounded-lg">
                <div className="flex mb-4">
                  <div className="w-1/3 font-semibold ">Fullname:</div>
                  <div className="w-2/3 font-bold uppercase text-slate-800 ">
                    {" "}
                    {user.fullname}
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-1/3 font-semibold">Email:</div>
                  <div className="w-2/3 font-semibold">{user.email}</div>
                </div>
                <div className="flex mb-4">
                  <div className="w-1/3 font-semibold">Gender:</div>
                  <div className="w-2/3 font-semibold">{user.gender}</div>
                </div>
                <div className="flex mb-4">
                  <div className="w-1/3 font-semibold">Mobile:</div>
                  <div className="w-2/3 font-semibold">{user.mobile}</div>
                </div>
                <div className="flex mb-4">
                  <div className="w-1/3 font-semibold">Address:</div>
                  <div className="w-2/3 font-semibold">{user.address}</div>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className=" bg-red-600 font-semibold hover:bg-red-400 text-white w-full py-2 rounded-md "
              >
                DELETE ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
