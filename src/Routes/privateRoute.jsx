import React, { Fragment } from "react";

const PrivateRoute = ({ component: Component }) => {
  const user = localStorage.getItem("User");
  if (user) {
    return (
      <Fragment>
        <Component />
      </Fragment>
    );
  } else {
    window.location.href = "/login";
  }
};

export default PrivateRoute;
