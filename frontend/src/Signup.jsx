import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "./Burl";
import { userregister } from "./apis/register";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string().required("Mobile Number is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    address: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      gender: "",
      email: "",
      mobile: "",
      password: "",
      confirm_password: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        toast.loading("Please Wait...", { id: "1" });

        // Perform API request using Axios
       const registerdata =await userregister(values);
        console.log(registerdata);

        if(registerdata.success==false){
          toast.error(registerdata?.statusText, { id: "1" });
        }else{
          toast.success(`${registerdata.message}`, { id: "1" });
          setTimeout(() => {
            nav("/signin");
          }, 2000);
        }

       
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.error || "An error occurred");
      }
    },
  });

  return (
    <>
      <Toaster />

      <div className="flex flex-col h-screen w-full bg-[url('../backs3.jpg')] bg-no-repeat bg-fixed bg-cover items-center">
        <div className="bg-slate-900 sticky top-0  flex justify-between px-8 items-center py-6 w-full">
          <h1 className="text-xl sm:text-xl md:text-3xl lg:text-3xl  text-white font-bold">
            ALTBLOGS
          </h1>
        </div>

        <div className=" lg:w-3/6 md:w-3/4 sm:w-4/5 w-6/7 mx-2  py-8 mt-5 px-8 bg-white  shadow-lg  rounded-md flex flex-col justify-center">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full  ">
              <h2 className="text-center shadow-lg bg-slate-200  py-2 rounded-md text-2xl font-bold leading-9 tracking-tight text-black">
                SIGN UP
              </h2>
            </div>

            <div className="flex justify-between  w-full px-2 py-2 items-start">
              <div className="w-1/2 px-2 flex flex-col justify-start h-1/2 ">
                <div className="py-2">
                  <label className="block truncate text-sm font-medium leading-6 text-black">
                    Full Name:
                    <input
                   
                      className={
                        formik.errors.fullname && formik.touched.fullname
                          ? "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-red-500 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                          : "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                      }
                      type="text"
                      name="fullname"
                      placeholder="Enter Your Name"
                      value={formik.values.fullname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.fullname && formik.touched.fullname && (
                      <div className="text-red-500 fixed  text-xs ">
                        {formik.errors.fullname}
                      </div>
                    )}
                  </label>
                </div>
                <div className="py-2">
                  <label className="block truncate text-sm font-medium leading-6 text-black">
                    Gender:
                    <select
                     
                      className={
                        formik.errors.gender && formik.touched.gender
                          ? "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-red-500 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                          : "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                      }
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" label="Select Gender" />
                      <option value="male" label="Male" />
                      <option value="female" label="Female" />
                      <option value="other" label="Other" />
                    </select>
                    {formik.errors.gender && formik.touched.gender && (
                      <div className="text-red-500 fixed text-xs ">
                        {formik.errors.gender}
                      </div>
                    )}
                  </label>
                </div>

                <div className="py-2">
                  <label className="block truncate text-sm font-medium leading-6 text-black">
                    Mobile Number:
                    <input
                     
                      className={
                        formik.errors.mobile && formik.touched.mobile
                          ? "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-red-500 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                          : "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                      }
                      type="text"
                      name="mobile"
                      placeholder="Enter Your Mobile Number"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.mobile && formik.touched.mobile && (
                      <div className="text-red-500 fixed text-xs ">
                        {formik.errors.mobile}
                      </div>
                    )}
                  </label>
                </div>

                <div className="py-2">
                  <label className="block truncate text-sm font-medium leading-6 text-black">
                    Email:
                    <input
                     
                      className={
                        formik.errors.email && formik.touched.email
                          ? "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-red-500 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                          : "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                      }
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div  className="text-red-500 fixed text-xs ">
                        {formik.errors.email}
                      </div>
                    )}
                  </label>
                </div>

                {/* ... (other form fields with validation) */}
              </div>

              <div className="w-1/2 px-2 flex  flex-col justify-start align-start h-1/2  ">
                <div className="py-2">
                  <label className="block truncate text-sm font-medium leading-6 text-black">
                    Password:
                    <div className="relative">
                      <input
                       
                        className={
                          formik.errors.password && formik.touched.password
                            ? "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-red-500 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                            : "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                        }
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Your Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-2 py-2 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {formik.errors.password && formik.touched.password && (
                      <div className="text-red-500 fixed text-xs ">
                        {formik.errors.password}
                      </div>
                    )}
                  </label>
                </div>
                <div className="py-2">
                  <label className="block truncate text-sm font-medium leading-6 text-black">
                    Confirm Password:
                    <input
                     
                      className={
                        formik.errors.confirm_password &&
                        formik.touched.confirm_password
                          ? "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-red-500 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                          : "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                      }
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Your Password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.confirm_password &&
                      formik.touched.confirm_password && (
                        <div className="text-red-500 fixed text-xs ">
                          {formik.errors.confirm_password}
                        </div>
                      )}
                  </label>
                </div>

                <div className="py-2">
                  <label className="block truncate text-sm font-medium leading-6 text-black">
                    Address:
                    <textarea
                     
                      className={
                        formik.errors.address && formik.touched.address
                          ? "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-red-500 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                          : "block truncate w-full pl-3 py-2 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                      }
                      name="address"
                      placeholder="Enter Your Address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.address && formik.touched.address && (
                      <div className="text-red-500 fixed text-xs ">
                        {formik.errors.address}
                      </div>
                    )}
                  </label>
                </div>

                {/* ... (other form fields with validation) */}
              </div>
            </div>

            <div className="py-2">
              <button
                type="submit"
                className="flex justify-center w-full px-3 py-2 text-sm font-semibold leading-6 text-white bg-slate-900 rounded-md shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
               >
                REGISTER
              </button>
            </div>
            <div className="">
                <p className="text-center text-sm font-medium leading-6 text-black">
                  Already have an account?{" "}
                  <Link className="text-slate-900 font-bold " to="/signin">
                    LOGIN
                  </Link>
                </p>
              </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
