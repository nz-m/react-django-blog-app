import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const toggleNav = () => {
    setShow(!show);
  };
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
            <Link to="/">
              <span className="site-logo" style={{ fontSize: "2rem" }}>
                <span className="text-primary"> B</span>log
                <span className="text-primary">H</span>ub
              </span>
            </Link>
          </div>
          <button
            className="block md:hidden border border-primary rounded-lg p-2 focus:outline-none"
            type="button"
            onClick={toggleNav}
          >
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
          </button>

          <div
            className={`${
              show ? "block" : "hidden"
            } md:block w-full md:w-auto md:ml-auto align-middle`}
          >
            <ul
              className="
              pt-4 text-gray-300 text-base
              md:flex
              md:justify-between 
              md:pt-0"
            >
              <li className="md:p-4 py-2 block hover:text-primary font-bold">
                <Link to="/technology">Technology</Link>
              </li>
              <li className="md:p-4 py-2 block hover:text-primary font-bold">
                <Link to="/education">Education</Link>
              </li>
              <li className="md:p-4 py-2 block hover:text-primary font-bold">
                <Link to="/music">Music</Link>
              </li>

              {user ? (
                <li className="md:p-4 py-2 block hover:text-primary ">
                  <Link to="/profile">
                    <p className="text-primary font-bold">{user.username}</p>
                  </Link>
                </li>
              ) : null}

              {user ? (
                <li className="md:p-4 py-2 block hover:text-primary font-bold">
                  <button
                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded"
                    onClick={() => {
                      userLogout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="md:p-4 py-2 block hover:text-primary font-bold">
                    <Link to="/signup">Sign Up</Link>
                  </li>

                  <li className="md:p-4 py-2 block hover:text-primary font-bold">
                    <Link
                      className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
