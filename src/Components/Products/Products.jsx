import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  let [allProducts, setAllProducts] = useState([]);

  function getProducts() {
      axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        console.log(data.data);
        setAllProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);


  
  
  return (
    <>
      <div className="row">

          {allProducts.map((product) => 
        
            <div key={product.id} className="w-1/6  px-4 ">
              <div className="product py-4 ">
            <Link to={`/productdetails/${product.id}`} >
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
                <div className="flex justify  -between mb-2 items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow"></i>
                  </span>
                </div>
                  <button className="btn">add to cart</button>

                </Link>
                

              </div>
            </div>
          )}
        </div> 
      </>
  )
  } 

      
          
