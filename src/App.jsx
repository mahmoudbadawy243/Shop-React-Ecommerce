/*

==   npm i react-router-dom  >>>  to be able to use Routing

-- path: ""  >>>  when path is localhost only display the home page

-- index: true  >>>  display that page as default start page

-- making navbar and footer fixed in all sections is built in layout section

-- remember to write in return >>> <RouterProvider 
                                          router={router}
                                          future={{ v7_startTransition: true }} //new version of react router
                          >
                          </RouterProvider>


--  new version of react router must write that >>>
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true, // Enable the future flag
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});


== react query = tanstack query >>> it is a server state management - handle data that come from API - it enable me to put data from API in cashe of browser then i can use it by different components without making another request or refething or go to server

== npm i @tanstack/react-query

== first step : import { QueryClient } from "./../node_modules/@tanstack/query-core/src/queryClient"; then taking instance of it >>> let query = new QueryClient();

== secound step is : import { QueryClientProvider } from "@tanstack/react-query";  then put all tags in return between that tag

== to use react-query in determin section i must do that in that section >> import { useQuery } from "@tanstack/react-query";

==  we use devtool of reactQury that provide some features and appear as icon when development only >> npm i @tanstack/react-query-devtools  >> then import 'ReactQueryDevtools' as show below then put the tag below in return >> <ReactQueryDevtools />
---------------------------------------------------------------------

*/

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
// import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Footer from "./Components/Footer/Footer";
import Layout from "./Components/Layout/Layout";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient } from "./../node_modules/@tanstack/query-core/src/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/production";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout.jsx/Checkout";
import Orders from "./Components/Orders/Orders";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

let query = new QueryClient();

let routes = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgotPassword",
        element: (
            <ForgotPassword />
        ),
      },
      {
        path: "resetPassword",
        element: (
            <ResetPassword />
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        // /:cartId
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "footer",
        element: (
          <ProtectedRoute>
            <Footer />
          </ProtectedRoute>
        ),
      },
      {
        path: "layout",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
      },
      {
        path: "navbar",
        element: (
          <ProtectedRoute>
            <Navbar />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
];

// new version of react router
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true, // Enable the future flag
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

function App() {
  return (
    <>
      <CartContextProvider>
        <QueryClientProvider client={query}>
          <UserContextProvider>
            <RouterProvider
              router={router}
              future={{ v7_startTransition: true }} //new version of react router
            ></RouterProvider>
            <Toaster />
            <ReactQueryDevtools />
          </UserContextProvider>
        </QueryClientProvider>
      </CartContextProvider>
    </>
  );
}
export default App;
