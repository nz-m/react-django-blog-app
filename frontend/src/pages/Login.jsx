import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { userLogin, errMessage } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const { message } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(username, password);
  };

  const notify = () => {
    toast(`${message ? message : ""}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    if (message) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      <section>
        {message && (
          <ToastContainer
            position="top-center"
            autoClose={5000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        )}

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
          <div className="w-full bg-primary-neutral  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
                Sign in to your account
              </h1>
              {errMessage && (
                <p className="text-red-500 text-sm">{errMessage}</p>
              )}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium  "
                  >
                    Username
                  </label>
                  <input
                    className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium  "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Sign in
                </button>
                <p className="text-sm text-center font-light text-white dark:text-white">
                  Don’t have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
