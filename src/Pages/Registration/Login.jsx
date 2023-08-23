import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../../Context/data/globalContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import Loader from "../../Components/Loader";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const { loader, setLoader } = useContext(GlobalContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    if (
      name === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues[name])
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Email required ",
      }));
    } else if (name === "password" && !value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Password required",
      }));
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

    if (!formValues.email) {
      errors.email = "Email is required";
      toast.error("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      errors.email = "Invalid email address";
      toast.error("Invalid email address");
    }

    if (!formValues.password) {
      errors.password = "Password is required";
      toast.error("Password is required");
    }

    setFormErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      console.log(formValues);
      setLoader(true);
      const email = formValues.email;
      const password = formValues.password;

      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(JSON.stringify(result));
        localStorage.setItem("User", JSON.stringify(result))
        toast.success("SignIn Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        window.location.href = "/";
        setLoader(false);
      } catch (error) {
        console.log(error);
        toast.error("SignIn Failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoader(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen shadow-md bg-slate-900">
      {loader && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <form>
          <div>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
            {formErrors.email && (
              <div className="text-red-500">{formErrors.email}</div>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
            {formErrors.password && (
              <div className="text-red-500">{formErrors.password}</div>
            )}
          </div>
          <div className="flex justify-center mb-3">
            <button
              
              onClick={handleFormSubmit}
              className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
              disabled = {!initialValues}
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className="text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
