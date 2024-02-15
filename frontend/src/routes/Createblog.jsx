import { Fragment, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {BASEURL} from "../Burl"
import { useFormik } from "formik";
import { createblogfn } from "../apis/register";
import * as Yup from "yup";

const Postblog = async (title, description, uid) => {
  try {
    const res = await axios.post(`${BASEURL}/altblog/blog/`, {
      title,
      content:description,
      userid:uid
    });
    return res.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error posting blog:", error);
    throw error;
  }
};


const Createblog = () => {

  const [uid, setUid] = useState("");
  const nav =useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        toast.loading("Please Wait...", { id: "1" });
               
        await handleSubmit(values);

      } catch (e) {
        console.log(e);
        // toast.error(e.response.data.message, { id: "1" });
      }
    },
  });


  const handleSubmit = async (e) => {

    try {
      toast.loading("Please Wait", { id: "1" });
      const res = await createblogfn(e);
      console.log("sends",res?.statusCode);
     if(res.statusCode){
  toast.success("Blog Created Successfully", { id: "1" });
      setTimeout(() => {
        nav("/");
      }, 1000);
     }else{
     
      toast.error("Something went wrong, Please try again.", { id: "1" });
      setTimeout(() => {
        nav("/");
      }, 1000);
     }
    
    } catch (error) {
      console.log(error)
      // Error handling if needed
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-[url('/createblog.jpg')] h-screen overflow-y-scroll bg-no-repeat bg-fixed  bg-center  bg-cover ">
    
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
      ALTBLOG
       </h1>
     </div>

     <div className="w-full flex flex-col pt-4 justify-center items-center ">
      
        <div className="lg:w-2/6 md:w-3/4 sm:w-full w-4/5  mx-6 py-8 px-5 bg-white shadow-lg rounded-md flex flex-col justify-center ">
          <div className="sm:w-full">
            <h2 className="text-center bg-slate-100 py-2 rounded-md text-2xl font-bold leading-9 tracking-tight text-black">
              CREATE BLOG
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full ">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-black">
                  Title
                </label>
                <div className="mt-2">
                <input
                    id="title"
                    name="title"
                  
                    placeholder="Your Title"
                 maxLength={20}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="block w-full pl-3 py-3 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset   :ring-slate-600 sm:text-sm sm:leading-6"
                  />
                
                </div>
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 fixed text-xs">
                    {formik.errors.title}
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Description
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="mt-2">
                  <textarea
                 
                    placeholder="Enter Description"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  
                    className="block w-full pl-3 py-3 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 fixed text-xs">
                    {formik.errors.description}
                  </p>
                )}
              </div>
              <div className="flex py-4 justify-between items-center w-full">
                <button
                  type="submit"
                  className="flex justify-center w-full px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-slate-600 rounded-md shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Createblog;
