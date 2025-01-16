import React, { useContext } from "react";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

// --------------------------------------------------------------------------

export default function Checkout() {
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let { checkout } = useContext(CartContext);
  // let  { cartId} = useParams();

  // -------------------------------------------------------------------------------------------------------------------------------------

  // --------------------------
  async function handleCheckout(cartId, url) {
    let { data } = await checkout(cartId, url, formik.values);
    if (data?.status == "success") {
      window.location.href = data.session.url; // from backend from postman
    }
  }

  let formik = useFormik({
    // values that will sent to backend
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: () =>
      handleCheckout("6735ebcd803e888e051d68db", "http://localhost:5173"), // musr be in arrow function -- this valued mustn't be static
  });

  // -----------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mt-40 mx-auto  ">
        <h2 className="text-3xl font-bold text-green-600 mb-7  ">
          Check Out Now
        </h2>

        {/* -------------------------------------------------------------------------- */}

        <div className="relative z-0 w-full mb-5 group">
          <input
            name="details"
            id="details"
            type="text"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your details :
          </label>
        </div>

        {/* ------------------------------------------------------------------------- */}
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
            Enter phone
          </label>
        </div>
        {/* ------------------------------------------------------------------------- */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="city"
            id="city"
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter city
          </label>
        </div>

        {/* ------------------------------------------------------------------------- */}
        <div className="flex items-center mt-10 ">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <span>Pay Now</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
