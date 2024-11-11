import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Footer from "./Components/Footer/Footer";
import Layout from "./Components/Layout/Layout";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/Notfound";
import UserContextProvider from "./Context/UserContext";

let routes = [
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
      { path: "brands", element: <Brands /> },
      { path: "categories", element: <Categories /> },
      { path: "footer", element: <Footer /> },
      { path: "layout", element: <Layout /> },
      { path: "navbar", element: <Navbar /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: " * ", element: <NotFound /> },
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
