import React, { useState, useEffect } from "react";
import logo from "../Utils/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoggedIn,
  isRegistered,
  loading,
  error,
  register,
  clearAuthState,
} from "../Store/Slices/AuthSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({}); // Validation errors
  const login = useSelector(isLoggedIn);
  const signUp = useSelector(isRegistered);
  const isLoading = useSelector(loading);
  const authError = useSelector(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  

  // Validate form fields before submission
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First Name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        errors.email = "Invalid email format";
      }
    }
    if (!formData.password.trim()) errors.password = "Password is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthState());

    if (!validateForm()) return; // Stop submission if validation fails

    const result = await dispatch(register(formData));

    if (result.meta.requestStatus === "fulfilled") {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",  
      })
      navigate("/");
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-12 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Create a New Account
          </h2>
           {/* Display General Errors */}
           {authError && <p className="text-red-500 text-sm">{authError}</p>}
        </div>


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
              />
              {validationErrors.firstName && <p className="text-red-500 text-sm">{validationErrors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
              />
              {validationErrors.lastName && <p className="text-red-500 text-sm">{validationErrors.lastName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
              />
              {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
              />
              {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white shadow-sm hover:bg-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
