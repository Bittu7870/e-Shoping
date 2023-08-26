import React, { createContext, useEffect, useState } from "react";
import { fireDB } from "../../Firebase/FirebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

export const GlobalContext = createContext();

const GlobalFlowContext = (props) => {
  const [mode, setMode] = useState("light");
  const [loader, setLoader] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#111827";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#ffffff";
    }
  };

  const [productData, setProductData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    description: "",
    time: Timestamp.now(),
    Date: new Date().toLocaleString("en-us", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      newProduct.title === "" ||
      newProduct.price === "" ||
      newProduct.imageUrl === "" ||
      newProduct.description === ""
    ) {
      return toast.error("All Fields are Required");
    }

    const productRef = collection(fireDB, "products");
    setLoader(true);
    try {
      await addDoc(productRef, newProduct);
      toast.success("Product Added Successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoader(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Add Product");
      setLoader(false);
    }
  };

  // get Products
  const getProductData = () => {
    setLoader(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((item) => {
          productArray.push({ ...item.data(), id: item.id });
        });
        setProductData(productArray);
        setLoader(false);
      });
      return data;
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  // edit product
  const editHandle = (item) => {
    setNewProduct(item);
  };

  console.log("id:", newProduct.id, productData);
  // update product
  const updateProduct = async () => {
    setLoader(true);
    try {
      await setDoc(doc(fireDB, "products", newProduct.id), newProduct);
      toast.success("Product Updated successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
    setNewProduct("");
  };

  const deleteProduct = async (item) => {
    try {
      setLoader(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoader(false);
      getProductData();
    } catch (error) {
      toast.success("Product Deleted Failed");
      setLoader(false);
    }
  };

  // get Order from Database
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoader(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoader(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  // get users from db
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoader(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoader(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  const value = {
    mode,
    toggleMode,
    loader,
    setLoader,
    newProduct,
    setNewProduct,
    addProduct,
    productData,
    editHandle,
    updateProduct,
    deleteProduct,
    order,
    user,
  };

  return <GlobalContext.Provider value={value} {...props} />;
};

export default GlobalFlowContext;
