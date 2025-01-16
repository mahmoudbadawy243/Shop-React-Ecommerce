{
  /* 

==  useQuery has all thing you will need about API like data, isError, error, isLoading

== to use react-query here i must >>> import { useQuery } from "@tanstack/react-query";

==  in useQuery i have tow essential parameters : queryKey , queryFn
-- queryKey is important as i can use that name in different sections and they will understand that is the same qurey used in other component >>  queryKey: ["recentProducts"],
-- queryFn used to pass for it function that call API with any methode axios or fetch without making then or catch




== to use spiner >> npm install react-spinners then import { BeatLoader } from "react-spinners"; then use it in any position <BeatLoader color="green"  size="40"   />

== to use toaster >>> npm i react-hot-toast

== don't forget to write that in app.jsx >>> import { Toaster } from "react-hot-toast"; then put <Toaster /> tag in return tags then import toast from "react-hot-toast"; then used it in if statement
== i have also react-toastify that i can use it instead of 




*/
}

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  // --------------------------------------------------------------------------------------

  // operations on cart
  // i can doing that on button below : onClick={()=> addToCart} directly but i donig that to test the response of function and using toast

  let { addToCart, setCart, cart } = useContext(CartContext);
  // i will get productId when calling function below in return
  async function addCartAndEdit(productId) {
    let response = await addToCart(productId);
    // i know the architicture of response having data having status from postman
    if (response?.data.status === "success") {
      console.log(response.data);
      setCart(response.data);

      toast.success("product is added ", {
        duration: 1500,
        position: "bottom-left",
      });
    } else {
      toast.error("product not added", {
        duration: 1500,
        position: "bottom-left",
      });
    }
  }

  // --------------------------------------------------------------------------------------
  // the new way i will use react-query instead of the old way using useState and useEffect

  function getRecent() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  //  useQuery has all thing you will need about API like data, isError, error, isLoading
  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecent,
    // refetchInterval: 3000, // fetch data each 3 sec
    // refetchIntervalInBackground : true , // fetch data even go another component
    staleTime: 80000, // after 1 sec data become stale not fresh
    // retry: 3, // number of fetch data in error to try to get it
    // retryDelay : 5000, // after 5 sec between each retry
    select: (data) => data?.data.data, // data come from API in form of > data inside data inside data - and should to put "?" as the first responce is undefined
  });
  console.log(data);
  // for spinner
  if (isLoading) {
    return (
      <div className="py-8 w-full flex justify-center ">
        <BeatLoader color="green" size="40" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 w-full flex justify-center ">
        <h3>{error}</h3>
      </div>
    );
  }
  // --------------------------------------------------------------------------------------

  // ==============================================================================================
  // the old way using useState and useEffect and the new way i will use react-query
  // export default function Products() {
  //   let [allProducts, setAllProducts] = useState([]);

  //   function getProducts() {
  //       axios
  //       .get("https://ecommerce.routemisr.com/api/v1/products")
  //       .then(({ data }) => {
  //         console.log(data.data);
  //         setAllProducts(data.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

  //   useEffect(() => {
  //     getProducts();
  //   }, []);
  // ===============================================================================================

  return (
    <>
      <div className="row">
        {/* {allProducts.map((product) =>   this line for old method   */}
        {data.map((product) => (
          <div key={product.id} className="w-1/6  px-4 py-2">
            <div className="product py-4 ">
              <Link // make each product alink to its productDetails page
                to={`/productdetails/${product.id}/${product.category.name}`} // don't forget to change routing in 'App.jsx' to " path: "productdetails/:id/:category"
              >
                <img
                  src={product.imageCover}
                  className="w-full"
                  alt={product.title}
                />
                <span className="block font-light mt-2 text-green-600">
                  {product.category.name}
                </span>
                <h3 className="text-lg font-normal text-gray mb-4">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between mb-2 items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
              </Link>
              {/* ===============================================================*/}
              <button
                onClick={() => {
                  addCartAndEdit(product.id);
                }}
                className="btn hover:bg-green-700 "
              >
                add to cart
              </button>
              {/* ================================================================*/}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
