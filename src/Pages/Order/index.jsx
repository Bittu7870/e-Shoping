import React, { useContext } from "react";
import Layout from "../../Components/Layout";
import { GlobalContext } from "../../Context/data/globalContext";
import Loader from "../../Components/Loader";

const Order = () => {
  const { mode, loader, order } = useContext(GlobalContext);
  const userId = JSON.parse(localStorage.getItem("User")).user.uid;
  console.log(order)
  return (
    <Layout>
      {loader && <Loader />}
      {order.length > 0 ? (
        <>
          <div className=" h-full pt-10">
            {order
              .filter((item) => item.userid === userId)
              .map((order, index) => {
                return (
                  <div key={index} className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {order.cartItem.map((item) => {
                      console.log(item)
                      const { imageUrl, title, description, price } = item
                      return (
                        <div className="rounded-lg md:w-2/3">
                          <div
                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                            style={{
                              backgroundColor: mode === "dark" ? "#282c34" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <img
                              src={imageUrl}
                              alt="product_image"
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2
                                  className="text-lg font-bold text-gray-900"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {title}
                                </h2>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {description}
                                </p>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <h2 className=" text-center tex-2xl text-white">Not Order</h2>
      )}
    </Layout>
  );
};

export default Order;
