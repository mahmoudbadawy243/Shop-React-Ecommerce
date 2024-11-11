import React from "react";
import { NavLink } from "react-router-dom";
// import logo from " ../../../src/assets/images/logo.svg";
export default function Navbar() {
  return (
    <>
      <nav className="px-8 mb-8  static bg-main-light top-0 left-0 right-0 ">
        <div className=" justify-between mx-auto py-2 flex flex-col lg:flex-row ">
          <div className=" flex flex-col lg:flex-row items-center">
            {/* <img src={logo} width={110} alt="fresh cart logo" /> */}
            <ul className="flex flex-col lg:flex-row justify-content mx-8 items-center ">
              <li className="mx-2 py-2 text-lg text-slat-900">
                <NavLink to=""> Home</NavLink>
              </li>
              <li className="mx-2 py-2 text-lg text-slat-900">
                <NavLink to="cart"> Cart</NavLink>
              </li>
              <li className="mx-2 py-2 text-lg text-slat-900">
                <NavLink to="categories">Categoris</NavLink>
              </li>
              <li className="mx-2 py-2 text-lg text-slat-900">
                <NavLink to="products">Products</NavLink>
              </li>
              <li className="mx-2 py-2 text-lg text-slat-900">
                <NavLink to="brands">Brands</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            <>
              <li className="mx-2 text-lg text-slat-900 py-2">
                <NavLink to="login"> Login</NavLink>
              </li>
              <li className="mx-2 text-lg text-slat-900 py-2">
                <NavLink to="register"> Register</NavLink>
              </li>
            </>
            <li className="mx-2 text-lg text-slat-900 py-2 cursor-pointer ">
              <span>Logout</span>
            </li>

            <li className="flex ml-4 py-2 items-center">
              <i className="fab mx-2 fa-facebook"></i>
              <i className="fab mx-2 fa-twitter"></i>
              <i className="fab mx-2 fa-instagram"></i>
              <i className="fab mx-2 fa-youtube"></i>
              <i className="fab mx-2 fa-tiktok"></i>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}
