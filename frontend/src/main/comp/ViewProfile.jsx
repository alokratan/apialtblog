import React, { useEffect, useState } from "react";
import { followuserbyid, getprofile } from "../../apis/register";
import axios from "axios";
import Wait from "./Wait";


const ViewProfile = ({ isOpen, onClose, onLogout }) => {
  const [userData, setUerData] = useState([]);
  useEffect(() => {
    if (!onLogout) return;
    console.log("useEffect", onLogout[0], onLogout[1]);
    viewprofilefn(onLogout);
  }, [onLogout]);

  const viewprofilefn = async (onLogout) => {
    const result = await getprofile(onLogout[0], onLogout[1]);
    // console.log("alldata",result.data);
    setUerData(result.data);
  };

  if (!isOpen) {
    return null;
  }
  const onClosefn = () => {
    setUerData([]);
    onClose();
  };
  const followfn = async(user) => {
    if (userData?.isfollowed) {
      const followdata = await followuserbyid(user);
      

      console.log(followdata);
      setUerData((prev) => ({ ...prev, isfollowed: false }));
      setUerData((prev) => ({ ...prev, countfollowedby: prev.countfollowedby - 1 }));
    } else {
      
        const followdata = await followuserbyid(user);
        setUerData((prev) => ({ ...prev, countfollowedby: prev.countfollowedby + 1 }));
        console.log(followdata);
      setUerData((prev) => ({ ...prev, isfollowed: true }));

    }
  }

  return (
    <div className="fixed  inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      {
        userData?._id ? (
          <div className="lg:w-2/6 md:w-3/4 sm:w-full w-4/5 position fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  py-8 px-5 bg-white shadow-lg rounded-md flex flex-col justify-center ">
          <div className="flex absolute top-5 left-3 ">
          <button
            onClick={() => onClosefn()}
            className="mr-1 px-2 py-1 text-white text-xs font-semibold bg-slate-700 rounded-full hover:bg-gray-400"
          >
            Back
          </button>
        </div>
        <div className="flex absolute top-5 right-3">
          <button onClick={()=>followfn(userData?._id)} className="mr-1 px-2 py-1 text-white text-xs font-semibold bg-blue-900 rounded-full hover:bg-gray-400">
           {userData?.isfollowed ? "Following" : "Follow"}
          </button>
        </div>
        <div className=" flex-col rounded-sm w-full flex justify-center items-center ">
          <div className="w-16 h-16  my-2 bg-slate-200 flex justify-center items-center rounded-full">
            <h4 className=" text-slate-400 text-2xl font-bold">
              A{/* {(userData?.fullname).slice(0,1)} */}
            </h4>
          </div>
          <h2 className="text-xl text-black font-bold">{userData?.fullname}</h2>
          <h6 className="text-xs text-slate-600 pr-2 font-bold">
            {userData?.email}
          </h6>
        </div>
        <div className=" w-full h-1 my-4  bg-slate-300 rounded-full"></div>
        <p className="text-xs mt-2 text-center font-semibold text-slate-500 italic">
          "{userData?.bio}"
        </p>
        <div className=" my-2 w-full  flex justify-around items-center ">
          <div className="w-1/4 h-16 flex flex-col justify-center items-center  bg-themeorange rounded-md">
            <h3 className=" text-2xl font-bold">23</h3>
            <p className="text-xs">Blogs</p>
          </div>
          <div className="w-1/4 h-16 flex flex-col justify-center items-center   bg-slate-300 rounded-md">
            <h3 className=" text-2xl font-bold">{userData?.countfollowedto}</h3>
            <p className="text-xs">Following</p>
          </div>
          <div className="w-1/4 h-16 flex flex-col justify-center items-center   bg-slate-500 rounded-md">
            <h3 className=" text-2xl font-bold">{userData?.countfollowedby}</h3>
            <p className="text-xs">Followers</p>
          </div>
        </div>
      </div>      
      ) :(
          <Wait/>
        )
      }
    </div>
  );
};

export default ViewProfile;
