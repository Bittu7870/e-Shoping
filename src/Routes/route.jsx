import React from "react";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";
import Signup from "../Pages/Registration/Singup";
import Login from "../Pages/Registration/Login";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import Home from "../Pages/Home";
import Order from "../Pages/Order";
import ProductInfo from "../Pages/ProductInfo";
import Cart from "../Pages/Cart";
import AddProduct from "../Pages/Admin/page/AddProduct";
import UpdateProduct from "../Pages/Admin/page/UpdateProduct";
import NoPage from "../Pages/NoPage";
import PrivateRouteForAdmin from "./privateRouteForAdmin";

const CombineRoute = () => {
  return [
    {
      path: "/dashboard",
      element: <PrivateRouteForAdmin component={Dashboard} />,
    },
    {
      path: "/",
      element: <PublicRoute component={Home} />,
    },
    {
      path: "/order",
      element: <PrivateRoute component={Order} />,
    },
    {
      path: "/productinfo/:id",
      element: <PrivateRouteForAdmin component={ProductInfo} />,
    },
    {
      path: "/cart",
      element: <PublicRoute component={Cart} />,
    },
    {
      path: "/addproduct",
      element: <PrivateRouteForAdmin component={AddProduct} />,
    },
    {
      path: "/updateproduct",
      element: <PrivateRouteForAdmin component={UpdateProduct} />,
    },
    {
      path: "/*",
      element: <PublicRoute component={NoPage} />,
    },
    {
      path: "/signup",
      element: <PublicRoute component={Signup} />,
    },
    {
      path: "/login",
      element: <PublicRoute component={Login} />,
    },
  ];
};

export default CombineRoute;
