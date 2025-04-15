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

import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  const { addToCart, setCart } = useContext(CartContext);

  async function addCartAndEdit(productId) {
    let response = await addToCart(productId);
    if (response?.data.status === "success") {
      setCart(response.data);
      toast.success("Product added to cart", {
        duration: 1500,
        position: "bottom-left",
      });
    } else {
      toast.error("Failed to add product", {
        duration: 1500,
        position: "bottom-left",
      });
    }
  }

  function getRecent() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecent,
    staleTime: 80000,
    select: (data) => data?.data.data,
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] w-full flex items-center justify-center">
        <BeatLoader color="green" size={40} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[400px] w-full flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h3 className="text-xl font-semibold mb-2">Error Loading Products</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 ">
        {data.map((product) => (
          <div key={product.id} className="product-card group px-12 py-4 md:p-0 ">
            <Link 
              to={`/productdetails/${product.id}/${product.category.name}`}
              className="block"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.imageCover}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  alt={product.title}
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <span className="text-sm text-green-600 font-medium">
                  {product.category.name}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mt-1 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-semibold text-gray-900">
                    {product.price} EGP
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-1">
                      {product.ratingsAverage}
                    </span>
                    <i className="fas fa-star text-yellow-400 text-sm"></i>
                  </div>
                </div>
              </div>
            </Link>
            <div className="p-4 pt-0">
              <button
                onClick={() => addCartAndEdit(product.id)}
                className="w-full btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
