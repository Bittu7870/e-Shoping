import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/data/globalContext";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";

function Signup() {
  const { loader, setLoader } = useContext(GlobalContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Name Required",
      }));
      toast.error("Name Required");
    } else if (
      name === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues[name])
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Email Required",
      }));
      toast.error("Email Required");
    } else if (name === "password" && !value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Password Required",
      }));
      toast.error("Password Required");
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formValues.name) {
      errors.name = "Full name is Required";
      toast.error("Full name is Required");
    }
    if (!formValues.email) {
      errors.email = "Email is Required";
      toast.error("Email is Required");
    }
    if (!formValues.password) {
      errors.password = "password is Required";
      toast.error("password is Required");
    }
    setFormErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      console.log(formValues);

      const name = formValues.name;
      const email = formValues.email;
      const password = formValues.password;
      setLoader(true);

      try {
        const users = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(users);

        const user = {
          name: name,
          email: users.user.email,
          uId: users.user.uid,
          time: Timestamp.now(),
        };
        console.log(user);
        const userRef = collection(fireDB, "users");
        await addDoc(userRef, user);
        toast.success("Signup Successfully");
        setFormValues(initialValues);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen shadow-md bg-slate-900">
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              value={formValues.name}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              type="text"
              name="name"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
            {formErrors.name && (
              <div className="text-red-500">{formErrors.name}</div>
            )}
          </div>
          <div>
            <input
              value={formValues.email}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              type="email"
              name="email"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
            {formErrors.email && (
              <div className="text-red-500">{formErrors.email}</div>
            )}
          </div>
          <div>
            <input
              value={formValues.password}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              type="password"
              name="password"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
            {formErrors.password && (
              <div className="text-red-500">{formErrors.password}</div>
            )}
          </div>
          <div className="flex justify-center mb-3">
            {loader ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onSubmit={handleFormSubmit}
                className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
              >
                Signup
              </button>
            )}
          </div>
        </form>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className="text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
