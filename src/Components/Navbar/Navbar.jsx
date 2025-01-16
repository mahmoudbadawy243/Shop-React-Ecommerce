/*

=== we use "NavLink" instead of "Link" as it already has ".active" class that we can write it in "index.css" and make our effects to apply on the special link in fixed navbar which its page is running 

== to make logOut we write 3 steps in fuction and pass it to logOut button

*/

import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import logo from "../../assets/images/logo.svg";
import menu from "../../assets/images/menu.svg";
import close from "../../assets/images/plus.svg";
import { Link as LinkScroll } from "react-scroll";
import { twMerge } from "tailwind-merge";

import { CartContext } from "../../Context/CartContext";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  let { cart } = useContext(CartContext);

  // -----------------------------------------------------------

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }
  // -----------------------------------------------------------

  return (
    <>
      {/* Burger Menu  ---------------------------------------------------------------------------------------------- */}
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="w-full "
      >
        <div className=" flex justify-between">
          {!isOpen ? (
            <img src={menu} alt="burger menu" className="p-6 lg:hidden " />
          ) : (
            <img src={close} alt="burger menu" className="p-6 lg:hidden" />
          )}
          <img src={logo} alt="logo" className="lg:hidden " />
        </div>
      </button>
      <div className={twMerge(" lg:block ", !isOpen && "hidden ")}>
        {/* --------------------------------------------------------------------------------------------------- */}
        <nav className=" static lg:fixed px-10 max-sm:py-8 top-0 left-0 right-0 z-50 bg-main-light ">
          <div className=" justify-between mx-auto  flex flex-col lg:flex-row ">
            <div className="flex flex-col lg:flex-row items-center">
              <img
                src={logo}
                width={110}
                alt="fresh cart logo"
                className="hidden lg:block"
              />
              <ul className="flex flex-col lg:flex-row justify-content mx-8 items-center ">
                {userLogin !== null ? ( // we use 'userLogin' that declared in 'UserContext' and carry 'token' if user is login
                  <>
                    <li className="mx-2 py-4 text-lg text-slat-200">
                      <NavLink to=""> Home</NavLink>
                    </li>
                    <li className="mx-2 py-4 text-lg text-slat-200">
                      <NavLink to="cart"> Cart</NavLink>
                    </li>
                    <li className="mx-2 py-4 text-lg text-slat-900">
                      <NavLink to="categories">Categoris</NavLink>
                    </li>
                    <li className="mx-2 py-4 text-lg text-slat-900">
                      <NavLink to="brands">Brands</NavLink>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              {userLogin == null ? (
                <>
                  <li className="mx-2 text-lg text-slat-900 py-4">
                    <NavLink to="login"> Login</NavLink>
                  </li>
                  <li className="mx-2 text-lg text-slat-900 py-4">
                    <NavLink to="register"> Register</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={logOut}
                    className="mx-2 text-lg text-slat-900 py-4 cursor-pointer "
                  >
                    <span>Logout </span>
                  </li>
                  <li>
                    <NavLink className={" relative cursor-pointer "}>
                      <i className="fa-solid fa-cart-shopping fa-xl py-4 "></i>
                      <span className="bg-green-600 text-white p-1 text-sm absolute top-[-10] right-[-10px] rounded-2xl ">
                        {" "}
                        {cart?.numOfCartItems}{" "}
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              <li className="flex ml-4 py-6 items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-tiktok"></i>
              </li>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
