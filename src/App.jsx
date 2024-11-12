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
import NotFound from "./Components/NotFound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

let routes = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
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
      // {
      //   path: "products",
      //   element: (
      //     <ProtectedRoute>
      //       <Products />
      //     </ProtectedRoute>
      //   ),
      // },
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
        path: " * ",
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
      <UserContextProvider>
        <RouterProvider
          router={router}
          future={{ v7_startTransition: true }} //new version of react router
        ></RouterProvider>
      </UserContextProvider>
    </>
  );
}
export default App;
