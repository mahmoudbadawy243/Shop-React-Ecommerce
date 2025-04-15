import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { displayCartItems, removeCartItems, updateCartItems } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getDisplayCartItems() {
    try {
      setIsLoading(true);
      const response = await displayCartItems();
      if (response?.data) {
        setCartDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDisplayCartItems();
  }, []);

  async function getRemoveCartItems(productId) {
    try {
      const response = await removeCartItems(productId);
      if (response?.data) {
        setCartDetails(response.data);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  async function getUpdateCartItems(productId, count) {
    try {
      if (count < 1) {
        await getRemoveCartItems(productId);
        return;
      }
      const response = await updateCartItems(productId, count);
      if (response?.data) {
        setCartDetails(response.data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!cartDetails?.data?.products?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 pt-20 md:pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Cart View (visible on small screens) */}
        <div className="md:hidden space-y-4">
          {cartDetails?.data.products.map((product) => (
            <div 
              key={product.product.id}
              className="bg-white rounded-lg shadow p-4 space-y-3"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.product.imageCover}
                  className="w-20 h-20 object-cover rounded"
                  alt={product.product.title}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.product.title}</h3>
                  <p className="text-gray-600">{product.price} EGP</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => getUpdateCartItems(product.product.id, product.count - 1)}
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center">{product.count}</span>
                  <button
                    onClick={() => getUpdateCartItems(product.product.id, product.count + 1)}
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => getRemoveCartItems(product.product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Cart View (visible on medium and larger screens) */}
        <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.data.products.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 h-16 object-cover rounded"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => getUpdateCartItems(product.product.id, product.count - 1)}
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center">{product.count}</span>
                      <button
                        onClick={() => getUpdateCartItems(product.product.id, product.count + 1)}
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => getRemoveCartItems(product.product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cartDetails?.cartId && (
          <div className="mt-8 mb-12 px-4">
            <div className="max-w-xs mx-auto">
              <Link to={`/checkout/${cartDetails.cartId}`}>
                <button className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
                  Check out Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
