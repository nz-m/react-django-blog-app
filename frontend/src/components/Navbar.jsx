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
        class="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
      >
       <div>
          <a href="#">
          <Link to="/">Blogger</Link>
          </a>
        </div>
       
         <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            class="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
       
       <div class="hidden w-full md:flex md:items-center md:w-auto" id="menu">
          <ul
            class="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
          >
            <li>
              <a class="md:p-4 py-2 block hover:text-purple-400" href="#"
                >    <Link to="/music">Music</Link></a>
            </li>
            <li>
              <a class="md:p-4 py-2 block hover:text-purple-400" href="#"
                > <Link to="/technology">Technology</Link></a
              >
            </li>
            <li>
              <a class="md:p-4 py-2 block hover:text-purple-400" href="#"
                >  {user ? (
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                ) : null}</a
              >
            </li>
            <li>
              <a class="md:p-4 py-2 block" href="#"
                >   {user ? (
                  <div className="flex gap-4">
                    <p> Hello {user.username} Welcome To Blogger</p>
                    <button className=" hover:text-purple-400 text-purple-500"
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
                    <li className=" block hover:text-purple-400 text-purple-500">
                      <Link to="/login">Login</Link>
                    </li>
                  
                  </>
                )}</a
              >
            </li>
          
          </ul>
        </div>
    </nav>
  </header>
  
  

    </>
  );
};

export default Navbar;
