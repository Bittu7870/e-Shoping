import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CombineRoute from "./route";

const Routing = () => {
  const routing = CombineRoute();
  // console.log(routing);
  return (
    <Router>
      <Routes>
        {routing &&
          routing.length !== 0 &&
          routing.map((e, i) => {
            return <Route key={i} path={e.path} element={e.element} />;
          })}
      </Routes>
    </Router>
  );
};

export default Routing;
