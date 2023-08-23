import React from "react";
import GlobalFlowContext from "./Context/data/globalContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routing from "./Routes";

const App = () => {
  return (
    <GlobalFlowContext>
        <Routing />
        <ToastContainer />
    </GlobalFlowContext>
  );
};

export default App;
