import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            alignItems: "center",
            justifyContent: "space-evenly",
            fontSize: "large",
          }}
        >
          {/* <ul> */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/music">Music</Link>
          </li>
          <li>
            <Link to="/technology">Technology</Link>
          </li>
          {user ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ) : null}

          {user ? (
            <>
              <p> Hello {user.username} You are logged in!</p>
              <button
                onClick={() => {
                  userLogout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
