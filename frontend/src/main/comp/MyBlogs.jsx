import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';
import DeleteBlog from "../comp/DeleteBlog";
import { deletemyBlogs, getAllBlogs, getUserBlogs, getuserdetails } from "../../apis/register";
import Updateblog from "../../routes/updateblog";
import Wait from "./Wait";


const MyBlogs = () => {
  const [user, setUser] = useState("");
  const [blogid,setBlogid]=useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [userblog, setUserblog] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [updatemodal, setUpdatemodal] = useState(false);
  const [editblog,setEditblog]=useState({});
  const [waiting,setWaiting]=useState(false);
  const navi = useNavigate();

  useEffect(() => {
   
    if (!localStorage.getItem("accessToken")) {
      navi("/signin");
    } else { 
      // toast.loading("Please Wait...", { id: "0" });
      return () => fetchUserBlogs();
    }
  
  }, [refreshData]);
  const fetchUserBlogs=async()=>{
    setWaiting(true);
    const userpersonal = await getuserdetails();
    // console.log(userpersonal);
    if (userpersonal.success == false) {
      // console.log("false:", userpersonal.success);
      // toast.error(userpersonal?.statusText, { id: "1" });
    }
    else {
      // console.log("true:", userpersonal.success);
      // toast.success("Welcome to LTblog", { id: "1" });
      // toast.success("Blog Fetched..", { id: "0" });
      setUser(userpersonal.data.fullname);
      
    }
    const userblogss = await getUserBlogs()
    console.log(userblogss);
    if (userblogss.success == false) {
      // console.log("false:", userblogss.success);
      // toast.error(userblogss?.statusText, { id: "1" });
    } else {
      // console.log("true:", userblogss.success);
      // toast.success("Welcome to ALTblog", { id: "1" });
      setUserblog(userblogss.data);
      setWaiting(false);
    }
  }

  const fndelete=(e)=>{
    setModalOpen(true)
    setBlogid(e)
   
   console.log(e)
  }

  const updateblogfn=(blogdata)=>{
    setEditblog(blogdata)
    setUpdatemodal(true)
    
  }

  const deleteblog = async (id) => {
const data=await deletemyBlogs(id);
console.log(data);
if(data.success==true){
  toast.success("Blog Deleted Successfully", { id: "0" });
  setRefreshData((prev) => !prev);
}
  };



  const afterupdatemodal = async (e) => {
    if(e==false){
      setUpdatemodal(false);
    }else{
      setUpdatemodal(false);
      await setRefreshData((prev) => !prev);
    }
    
  };


  const handleLogout = () => {
     deleteblog(blogid);    
    setModalOpen(false);
  };

  // console.log(user);
  return (
    <>
   <Toaster/>
      <div className="bg-[url('/public/createblog.jpg')] h-screen overflow-y-scroll bg-no-repeat bg-fixed  bg-center  bg-cover ">
      {
          waiting &&(
            <Wait/>
          )
        }
     
       <DeleteBlog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogout={handleLogout}
      />  
       <Updateblog data={editblog} updatemodal={updatemodal} onClose={(e) => afterupdatemodal(e)} />
      <div className="bg-slate-900 sticky top-0  flex justify-between px-8 items-center py-6 md:w-full">
     
      <Link
        to={"/"}
        className="flex bg-black p-3 rounded-md "
      >
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
        {user &&
        <>{user}
        <span className="lowercase">'s</span> Blog
        </>
        }

        </h1>
      </div>
    <div className="flex flex-1 flex-col">
    {userblog.length>0?(
      userblog.map((item)=>(
<div key={item._id} className="w-full flex px-3 flex-col pt-4 justify-center items-center ">

        <div className="w-full lg:w-3/4 md:w-3/4 sm:w-full p-4 rounded-md mx-3 my-4 bg-slate-200 flex flex-col justify-center">
          <div className="flex items-center my-1">
            <div className="mr-auto flex justify-between w-full ">
              <h2 className="font-bold text-xl capitalize">{item.title}</h2>
              <div className="flex h-7">
        
              <Link onClick={()=>updateblogfn(item)} className="py-1 text-center w-20 mx-1 px-2 bg-green-600 rounded-sm text-white text-sm font-semibold" >EDIT</Link>
              {/* <Link to ={`/deleteblog/${item._id}`}  className="py-1 text-center w-20 mx-1 px-2 bg-red-600 rounded-sm text-white  text-sm font-semibold" >DELETE</Link> */}
              <button onClick={()=>fndelete(item._id)}  className="py-1 text-center w-20 mx-1 px-2 bg-red-600 rounded-sm text-white  text-sm font-semibold" >DELETE</button>
              </div>
            </div>
          </div>
          <div className="mr-auto my-1 ">
            <p className="font-bold text-sm text-slate-700"> {new Date(item.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                          </p>
          </div>
          <div className=" bg-white w-full rounded-md py-4 px-4  mr-auto my-1">
          <h2 className="text-justify text-slate-600  text leading-loose font-serif italic" >{item.content}</h2>
                     
          </div>
        </div>
      </div>
      )).reverse()
   ):(<>
   <div className="w-full h-96 flex justify-center items-center">
          <h2 className=" text-white font-semibold">NO POST AVAILABLE
            </h2>
        </div>
   </>) }
     </div>

     </div>
     </>

      
  );
};

export default MyBlogs;
