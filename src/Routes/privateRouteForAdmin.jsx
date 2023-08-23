import React, { Fragment } from "react";

const PrivateRouteForAdmin = ({ component: Component }) => {
  const admin = JSON.parse(localStorage.getItem("User"));
  // console.log(admin.user.email)
  if (admin.user.email === "bittu@gmail.com") {
    return (
      <Fragment>
        <Component />
      </Fragment>
    );
  } else {
    window.location.href = "/login";
  }
};

export default PrivateRouteForAdmin;
