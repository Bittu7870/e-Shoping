import React from "react";

const Loader = () => {
  return (
    <div>
       <img
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          // height: "100%",
          width: "30%",
          transform: "translate(-50%, -50%)",
          zIndex: 99999,
          background: "transparent",
        }}
        src="https://ik.imagekit.io/sheryians/ezgif.com-optimize_poe8pAoXT.gif"
        alt="Loading...."
      />
    </div>
  );
};

export default Loader;
