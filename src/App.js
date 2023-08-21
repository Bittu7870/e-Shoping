import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Cart from "./Pages/Cart";
import NoPage from "./Pages/NoPage";
import GlobalFlowContext from "./Context/data/globalContext";
import Login from "./Pages/Registration/Login";
import Signup from "./Pages/Registration/Singup";
import ProductInfo from "./Pages/ProductInfo";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AddProduct from "./Pages/Admin/page/AddProduct";
import UpdateProduct from "./Pages/Admin/page/UpdateProduct";

const App = () => {
  return (
    <GlobalFlowContext>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element = {<Signup />} />
          <Route path="/productinfo/:id" element = {<ProductInfo />} />
          <Route path="/addproduct" element = {<AddProduct />} />
          <Route path="/updateproduct" element = {<UpdateProduct />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </GlobalFlowContext>
  );
};

export default App;
