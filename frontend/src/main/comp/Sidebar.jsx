import { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../Burl";
import { useFormik } from "formik";
import { createblogfn } from "../../apis/register";
import * as Yup from "yup";

export default function Sidebar({ isOpen,openSidebarfn, filteredPosts, onClose }) {
  const [open, setOpen] = useState(true);

 
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed top-0 right-0 z-10"
        initialFocus={onClose}
        onClose={setOpen}
      >
      <Transition.Child
  as={Fragment}
  enter="slide-right duration-900"
  enterFrom="translate-x-full"
  enterTo="translate-x-0"
  leave="slide-right duration-900"
  leaveFrom="translate-x-0"
  leaveTo="translate-x-full"
>
<div className="fixed inset-0  bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className=" absolute top-0 inset-y-0 right-0 h-screen  px-2 py-1  bg-slate-900 w-40">
              <div className="flex flex-col flex-1">
                <Link
                  to={"/profile"}
                  className="bg-white my-3 w-full px-2 py-2  text-black font-bold"
                >
                  Profile
                </Link>
                <Link
                  to={"/blog"}
                  className="bg-white my-3 w-full px-2 py-2  text-black font-bold"
                >
                  My Blogs
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-white text-left my-3 w-full px-2 py-2  text-black font-bold"
                >
                  Logout
                </button>
              </div>
              <div className="flex mt-6 mb-28 flex-col justify-center items-center w-full ">
                <h4 className="text-white font-bold uppercase ">Total Blogs</h4>
                <h1 className="text-white font-bold text-2xl">
                  {filteredPosts.length}
                </h1>
              </div>
              <button
                className="bg-white w-32 hover:scale-104 fixed shadow-lg  bottom-5 right-5  py-2 rounded px-2 text-center text-md font-semibold text-slate-900"
                onClick={openSidebarfn}
              >
                Close
              </button>
            </div>
      </Dialog>
    </Transition.Root>
  );
}
