import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav
          className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg 
          
        "
        >
          <div>
            <Link to="/" className="font-semibold text-2xl">Blogger <span className="text-primary font-bold text-3xl">.</span> </Link>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            className="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <div
            className="hidden w-full md:flex md:items-center md:w-auto"
            id="menu"
          >
            <ul
              className="
              pt-4 text-gray-300 text-base
              md:flex
              md:justify-between 
              md:pt-0"
            >
              <li className="md:p-4 py-2 block hover:text-primary">
                <Link to="/music">Music</Link>
              </li>
              <li className="md:p-4 py-2 block hover:text-primary hover:scale-95 transition duration-500">
                <Link to="/technology">Technology</Link>
              </li>
              <li className="md:p-4 py-2 block hover:text-primary hover:scale-95 transition duration-500">
                <Link to="/education">Education</Link>
              </li>

              {user ? (
                <li className="md:p-4 py-2 block hover:text-primary hover:scale-95 transition duration-500">
                  <Link to="/profile">Profile</Link>
                </li>
              ) : null}

              <li className="md:p-4 py-2 block">
                {user ? (
                  <div className="flex gap-4">
                    <p className="text-primary-accent">welcome {user.username}</p>
                    <button
                      className="btn btn-sm btn-outline btn-error text-white"
                      onClick={() => {
                        userLogout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link className="btn btn-sm  btn-primary text-white" to="/login">Login</Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
