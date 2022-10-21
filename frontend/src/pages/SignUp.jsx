import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const nagivate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const URL = `${BASE_URL}/api/register/`;

  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    bio: "",
    photo: "",
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
  const handlePhotoChange = (e) => {
    const { name, files } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: files[0],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("photo", user.photo);
    formData.append("bio", user.bio);

    const response = await fetch(URL, {
      method: "POST",
      body: formData,
    });
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
        <div className="w-full bg-primary-neutral  rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Create an account
            </h1>
            <form
              className=" grid grid-cols-1 md:grid-cols-2 gap-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  "
                >
                  Username <span className="text-red-500 font-bold">* </span>
                </label>
                <input
                  className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                  type="text"
                  name="username"
                  id="username"
                  value={user.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter a unique username"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  "
                >
                  Email (optional)
                </label>
                <input
                  className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
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
                  className="block mb-2 text-sm font-medium "
                >
                  Password
                  <span className="text-red-500 font-bold"> * </span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleChange}
                  className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium "
                >
                  Bio (optional)
                </label>
                <input
                  name="bio"
                  id="bio"
                  value={user.bio}
                  onChange={handleChange}
                  className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                />

                <label
                  htmlFor="photo"
                  className="block mb-2 text-sm font-medium "
                >
                  Photo (optional)
                </label>

                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handlePhotoChange}
                  className="bg-primary-base shadow-lg sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account already?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                >
                  Log In
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
