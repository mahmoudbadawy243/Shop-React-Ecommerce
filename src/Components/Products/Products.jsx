import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from 'react-spinners'
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


export default function Products() { 
  
// --------------------------------------------------------------------------------------
  let { addToCart } = useContext(CartContext)
  async function addCartAndEdit (productId) {
    let response = await addToCart(productId)
    if (response?.data.status === 'success') {
      toast.success('product adddddddddddddddddddddd',
        {
          duration: 1500,
          position: "bottom-left"
        }
      )
    } else {
      toast.error('not added',
        {
          duration: 1500,
          position: "bottom-left"
        }
      )
    }
  
  }
  
// --------------------------------------------------------------------------------------

  function getRecent() {
    return axios
    .get("https://ecommerce.routemisr.com/api/v1/products")
  }
  

  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecent,
    // refetchInterval: 3000, // fetch data each 3 sec
    // refetchIntervalInBackground : true , // fetch data even go another component
    staleTime: 80000, // after 1 sec data become stale not fresh
    // retry: 3, // number of fetch data in error to try to get it
    // retryDelay : 5000, // after 5 sec between each retry
    select : (data)=> data?.data.data
  })

  // for spinner
  if (isLoading) {
    return <div className="py-8 w-full flex justify-center ">
      <ClimbingBoxLoader   color="green" />
    </div>
  }  
  
  if (isError) {
    return <div className="py-8 w-full flex justify-center ">
      <h3>{error}</h3>
    </div>
  }  
// --------------------------------------------------------------------------------------


// ==============================================================================================
// the old way using useState and useEffect
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
        { data.map((product) =>
          <div key={product.id} className="w-1/6  px-4 py-2">
            <div className="product py-4 ">

              <Link to={`/productdetails/${product.id}/${product.category.name}`} >
                
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
                <button onClick={()=>{addCartAndEdit(product.id)}} className="btn hover:bg-green-700 ">add to cart</button>
                

            </div>
          </div>
        )}
      </div>
      </>
  )
  
}

      
          
