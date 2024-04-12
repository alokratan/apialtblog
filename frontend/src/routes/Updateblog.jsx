import { Fragment, useRef, useEffect, useState, useLayoutEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Burl";
import { useFormik } from "formik";
import { createblogfn, updateblogfn } from "../apis/register";
import * as Yup from "yup";

export default function Updateblog({data, updatemodal, onClose }) {

  useLayoutEffect(() => {
    // console.log("data:",data)
      formik.setValues({
        title: data.title,
        description: data.content
    })
  },[data])
  const [open, setOpen] = useState(true);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description:"",
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
    if(e.title==data.title && e.description==data.content){
      toast.error("No changes found", { id: "1" });
      return;
    }
    try {
      toast.loading("Please Wait", { id: "1" });
      const res = await updateblogfn(e,data);
      console.log("sends", res?.statusCode);
      if (res.statusCode) {
        toast.success("Blog Updated Successfully", { id: "1" });

        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        toast.error("Something went wrong, Please try again.", { id: "1" });
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      // Error handling if needed
    }
  };
  return (
    <Transition.Root show={updatemodal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={onClose}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-800"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-20"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
        </Transition.Child>

        <div className="lg:w-2/6 md:w-3/4 sm:w-full w-4/5 position fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-6 py-8 px-5 bg-white shadow-lg rounded-md flex flex-col justify-center ">
          <div className="sm:w-full">
            <h2 className="text-center bg-slate-100 py-2 rounded-md text-2xl font-bold leading-9 tracking-tight text-black">
              UPDATE BLOG
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full ">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-black"
                >
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
              <div className=" flex flex-col py-1 justify-between items-center w-full">
                <button
                  type="submit"
                  className="flex justify-center w-full px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-slate-600 rounded-md shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post
                </button>
                <button className="w-full"  type="button" onClick={()=>onClose(false)}>
                  <p className="text-slate-600 text-sm pt-3 cursor-pointer  text-center hover:text-slate-400    " >Go Back</p>
                </button>
              
              </div>
             
            </form>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
