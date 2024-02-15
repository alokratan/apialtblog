import { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "./Burl";

const SignIn = () => {
  const nav = useNavigate();


  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        toast.loading("Please Wait...", { id: "1" });
        const res = await axios.post(`/api/api/v1/users/login`, values);
        console.log(res);
        toast.success(res.data.message, { id: "1" });
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        setTimeout(() => {
          nav("/");
        }, 1000);
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message, { id: "1" });
      }
    },
  });

  return (
    <>
      <Toaster />

      <div className="flex flex-col h-screen  w-full bg-[url('../backs3.jpg')] bg-no-repeat bg-fixed bg-cover items-center">
        <div className="bg-slate-900   flex justify-between px-8 items-center py-6 w-full">
          <h1 className="text-xl sm:text-xl md:text-3xl lg:text-3xl  text-white font-bold">
            ALTBLOGS
          </h1>
        </div>
        <div className="lg:w-2/6 md:w-3/4 sm:w-full w-4/5 py-8 mt-10 px-6 bg-white shadow-lg rounded-md flex flex-col justify-center  ">
          <div>
            <h2 className="text-center shadow-lg bg-slate-200  py-2 rounded-md text-2xl font-bold leading-9 tracking-tight text-black">
              SIGN IN
            </h2>
          </div>
          <div className="mt-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="block w-full pl-3 py-3 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset   :ring-slate-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 fixed text-xs">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Password
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Your Password"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="block w-full pl-3 py-3 text-black placeholder:text-gray-400 border-0 rounded-md shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 fixed text-xs">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="flex py-4 justify-between items-center w-full">
                <button
                  type="submit"
                  className="flex justify-center w-full px-3 py-2 text-sm font-semibold leading-6 text-white bg-slate-900 rounded-md shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  LOGIN
                </button>
              </div>
              <div className="">
                <p className="text-center text-sm font-medium leading-6 text-black">
                  Don't have an account?{" "}
                  <Link className="text-slate-900 font-bold " to="/signup">
                    REGISTER
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
