/*

=== we use "NavLink" instead of "Link" as it already has ".active" class that we can write it in "index.css" and make our effects to apply on the special link in fixed navbar which its page is running 

== to make logOut we write 3 steps in fuction and pass it to logOut button

*/

import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import logo from "../../assets/images/logo.svg";
import menu from "../../assets/images/menu.svg";
import close from "../../assets/images/plus.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-main-light shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-8 w-auto" />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {userLogin && (
              <div className="flex space-x-6">
                <NavLink to="" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="cart" className="nav-link">
                  Cart
                </NavLink>
                <NavLink to="categories" className="nav-link">
                  Categories
                </NavLink>
                <NavLink to="brands" className="nav-link">
                  Brands
                </NavLink>
              </div>
            )}
          </div>

          {/* Desktop right section */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {!userLogin ? (
              <div className="flex space-x-4">
                <NavLink to="login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="register" className="nav-link">
                  Register
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <button onClick={logOut} className="nav-link">
                  Logout
                </button>
                <NavLink to="cart" className="relative">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  {cart?.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cart.numOfCartItems}
                    </span>
                  )}
                </NavLink>
              </div>
            )}

            <div className="hidden lg:flex items-center space-x-4 text-gray-400">
              <i className="fab fa-facebook hover:text-gray-600 cursor-pointer"></i>
              <i className="fab fa-twitter hover:text-gray-600 cursor-pointer"></i>
              <i className="fab fa-instagram hover:text-gray-600 cursor-pointer"></i>
              <i className="fab fa-youtube hover:text-gray-600 cursor-pointer"></i>
              <i className="fab fa-tiktok hover:text-gray-600 cursor-pointer"></i>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <img 
                src={isOpen ? close : menu} 
                alt="menu" 
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
            {userLogin ? (
              <>
                <NavLink to="" className="mobile-nav-link" onClick={closeMenu}>
                  Home
                </NavLink>
                <NavLink to="cart" className="mobile-nav-link" onClick={closeMenu}>
                  Cart
                </NavLink>
                <NavLink to="categories" className="mobile-nav-link" onClick={closeMenu}>
                  Categories
                </NavLink>
                <NavLink to="brands" className="mobile-nav-link" onClick={closeMenu}>
                  Brands
                </NavLink>
                <button onClick={() => { logOut(); closeMenu(); }} className="mobile-nav-link w-full text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="login" className="mobile-nav-link" onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink to="register" className="mobile-nav-link" onClick={closeMenu}>
                  Register
                </NavLink>
              </>
            )}
            
            <div className="flex justify-center space-x-4 py-3 text-gray-400">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-tiktok"></i>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
