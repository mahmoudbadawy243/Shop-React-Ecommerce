import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";


export default function ProductDetails() {


  let { id, category } = useParams()
  let[productDetails,setProductDetails]=useState(null)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => { 
        setProductDetails(data.data)
      })
      .catch((error)=>{console.log(error);
      })
    }
  
    useEffect(() => {
      getProductDetails(id)
    },[id , category])
  
  // =====================================================================================
  
  let [relatedProducts, setRelatedProducts] = useState([])
  
  function getRelatedProducts(category) {
    axios.get( `https://ecommerce.routemisr.com/api/v1/products` )
      .then(({ data }) => {
      let allProducts = data.data
      let related = allProducts.filter((product)=> product.category.name == category)
      setRelatedProducts(related)
      
      })
  }

  useEffect(() => {
      getRelatedProducts(category)
    },[])
  
  // -----------------------------------------------------------------------------------------
  
  
  return (
    <>
      <div className="row">
        <div className="w-1/4">
        <Slider {...settings}>
          { productDetails?.images.map(( src )=> <img src={src} className='w-full' alt={productDetails?.title} />
  )}
        </Slider>
        </div>
        
        <div className="w-3/4 p-6">
          <h1 className='text-lg font-normal text-gray-950 ' > {productDetails?.title}</h1>
          <p className='text-gray-600 font-light mt-6 ' > {productDetails?.description} </p>
      
          <div className="flex justify-between mt-10 items-center">
                  <span>{productDetails?.price} EGP</span>
                  <span>
                    {productDetails?.ratingsAverage}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
                  <button className="btn mt-6 hover:bg-green-700 ">add to cart</button>
      
        </div>
    </div>
    
  {/* ---------------------------------------------------------------------------------------- */}
      
      <div className="row  ">
        {relatedProducts.map((product) => 
          <div key={product.id} className="w-1/6 p-4 ">
            <div className="product py-4  ">

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
                <div className="flex justify  -between mb-2 items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
                  <button className="btn hover:bg-green-700 ">add to cart</button>

                </Link>
                
              </div>
          </div>    
        )}
    </div>

    </>

  )
}
