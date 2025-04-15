import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function ForgotPassword() {
  
  let navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);


// validation for email
  async function sendCode(value) {
    setisLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", value)
    console.log(data)
        if (data?.statusMsg == "success") {
          document.querySelector('.forgotPassword').classList.add('hidden')
          document.querySelector('.verifyCode').classList.remove('hidden')
          setisLoading(false);
      }
  }
  //-----------------------------------------------------------------------------------------------
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("emial is invalid").required("required"),
  });
  //-------------------------------------------------------------------------------------------------
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema ,
    onSubmit: sendCode
  });

  //=========================================================================================================================================================
  //=========================================================================================================================================================
  //=========================================================================================================================================================

  // validation for sent code
async function verifyCode(value) {
    setisLoading(true);
      let {data} = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", value)
        if (data?.status == "Success") {
          navigate("/resetPassword");
          setisLoading(false);
        }
      }
  //-----------------------------------------------------------------------------------------------
  let validationSchema2 = Yup.object().shape({
    resetCode: Yup.string().required("required"),
  });
  //-------------------------------------------------------------------------------------------------
  let verify = useFormik({
    // values that will sent to backend
    initialValues: {
      resetCode: "",
    },
    validationSchema :validationSchema2 ,
    onSubmit: verifyCode
  });
  //-------------------------------------------------------------------------------------------------

  
  return (


    <>      
      {/* forgotPassword */}

        <form onSubmit={formik.handleSubmit} className=" forgotPassword  max-w-md my-36 mx-auto  ">
        <h2 className="text-3xl font-bold text-green-800 mb-12 ">Forgot Password</h2>
      {/* -------------------------------------------------- */}
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
        {/* ------------------------------------------------------------------------- */}
        <div className=" mt-10 ">
          <button
            type="submit"
            className="text-white bg-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <span>Send Code</span>
            )}
          </button>
          </div>
      </form>
      

    {/* // ====================================================================================================================================================== */}
    {/* // ====================================================================================================================================================== */}
    {/* // ====================================================================================================================================================== */}

      {/* verifyCode */}
    
        <form onSubmit={verify.handleSubmit} className=" verifyCode  max-w-md my-36 mx-auto hidden ">
        <h2 className="text-3xl font-bold text-green-800 mb-12 ">Verify Code</h2>
      {/* -------------------------------------------------- */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="resetCode"
            id="resetCode"
            type="text"
            value={verify.values.resetCode}
            onChange={verify.handleChange}
            onBlur={verify.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Code :
          </label>
            </div>
          {verify.errors.resetCode && verify.touched.resetCode ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium"> {verify.errors.resetCode} </span>
            </div>
          ) : null}
        {/* ------------------------------------------------------------------------- */}
        <div className=" mt-10 ">
          <button
            type="submit"
            className="text-white bg-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <span>Verify</span>
            )}
          </button>
          </div>
      </form>
      </>

        
  )
}
