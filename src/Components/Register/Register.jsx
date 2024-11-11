import React from "react";
// import axios from "axios";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// -----------------------------------------------------------------

export default function Register() {
  let navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  // -----------------------------------------------------------------

  function handleRegister(value) {
    setisLoading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
      .then((apiResponse) => {
        if (apiResponse?.data?.message == "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          navigate("/");
          setisLoading(false);
        }
      })
      .catch((apiResponse) => {
        setisLoading(false);
        setapiError(apiResponse?.response?.data?.message);
      });
  }

  // ----------------------------------------------------------------------

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "not less 3")
      .max(10, "not more 10")
      .required("required"),
    phone: Yup.string().matches(
      /^01[0125][0-9]{8}$/,
      "phone must be valid egyption number"
    ),
    email: Yup.string().email("emial is invalid").required("required"),
    password: Yup.string().matches(
      /^[A-Z][a-z0-9]{5,10}$/,
      "start with capital then string and number 5-10 char"
    ),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "not match"),
  });

  // -------------------------------------------------------------------------

  let formik = useFormik({
    // values that will sent to backend
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },

    validationSchema,
    onSubmit: handleRegister,
  });

  // ----------------------------------------------------------------------------

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mt-10 mx-auto  ">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium"> {apiError} </span>
          </div>
        ) : null}

        <h2 className="text-3xl font-bold text-green-600 mb-7 ">
          Register Now
        </h2>
        {/* --------------------------------------------------------------------------- */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="name"
            id="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your name
          </label>

          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium"> {formik.errors.name} </span>
            </div>
          ) : null}
        </div>

        {/*--------------------------------------------------------------------- */}

        <div className="relative z-0 w-full mb-5 group">
          <input
            name="email"
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your Email address :
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium"> {formik.errors.email} </span>
          </div>
        ) : null}

        {/* --------------------------------------------------------------------- */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="phone"
            id="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium"> {formik.errors.phone} </span>
          </div>
        ) : null}
        {/* ----------------------------------------------------------------------------- */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="password"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium"> {formik.errors.password} </span>
          </div>
        ) : null}
        {/* ---------------------------------------------------------------------------------- */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="rePassword"
            id="rePassword"
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter password again
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium"> {formik.errors.rePassword} </span>
          </div>
        ) : null}
        {/* ----------------------------------------------------------------------------------- */}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : " Submit"}
        </button>

        {/* ---------------------------------------------------------------------------------- */}
      </form>
    </>
  );
}
