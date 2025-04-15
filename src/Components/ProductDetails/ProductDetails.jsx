import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function ProductDetails() {
  const { id, category } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, setCart } = useContext(CartContext);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  async function handleAddToCart(productId) {
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

  async function getProductDetails(id) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading product details");
    } finally {
      setIsLoading(false);
    }
  }

  async function getRelatedProducts(category) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const related = data.data.filter(
        (product) => product.category.name === category && product.id !== id
      );
      setRelatedProducts(related);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] w-full flex items-center justify-center">
        <BeatLoader color="green" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Slider */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-24">
            <Slider {...sliderSettings}>
              {productDetails?.images.map((src, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={src}
                    className="w-full h-full object-cover rounded-lg"
                    alt={`${productDetails?.title} - Image ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
            {productDetails?.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-2xl font-bold text-green-600">
              {productDetails?.price} EGP
            </span>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-1">
                {productDetails?.ratingsAverage}
              </span>
              <i className="fas fa-star text-yellow-400"></i>
            </div>
          </div>

          <p className="text-gray-600 text-base leading-relaxed mb-8">
            {productDetails?.description}
          </p>

          <button
            onClick={() => handleAddToCart(productDetails?.id)}
            className="btn btn-primary w-full sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="product-card group">
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
                    <h3 className="text-base font-medium text-gray-800 mt-1 line-clamp-2">
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
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full btn btn-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
