import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const nagivate = useNavigate();
  const URL = "http://127.0.0.1:8000/api/register/";
  // form fields = username, email, password, confirm password, first_name, last_name

  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, first_name, last_name } = user;
    const fields = {
      username: username,
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    };
    const response = await fetch(URL, options);
    const data = await response.json();

    if (response.status === 200) {
      nagivate("/login", { state: { message: "Successfully registered!" } });
    } else {
      setMessage(data.detail);
    }
  };

  return (
    <>
      {message ? message : null}
   
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray-50  rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign Up to your account
              </h1>
              <form className=" grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Username
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                    type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>

             
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*******"
                    value={user.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="*******"
                    name="confirm_password"
          id="confirm_password"
          value={user.confirm_password}
          onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    First Name
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Last Name
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                    type="text"
          name="last_name"
          id="last_name"
          value={user.last_name}
          onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account yet?{" "}
                  <Link
                    to={"/signup"}
                    className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default SignUp;
