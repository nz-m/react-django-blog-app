import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const userData = JSON.parse(localStorage.getItem("user"));
  const tokenData = JSON.parse(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  let [user, setUser] = useState(
    localStorage.getItem("user") ? userData : null
  );
  let [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") ? tokenData : null
  );
  const navigate = useNavigate();

  let userLogin = async (username, password) => {
    let response = await fetch(`${BASE_URL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(jwt_decode(data.access)));
      navigate("/");
    } else {
      setErrMessage(data.detail);
    }
  };

  const updateToken = async () => {
    let response = await fetch(`${BASE_URL}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authToken?.refresh }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(jwt_decode(data.access)));
    } else {
      userLogout();
    }
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, 1000 * 60 * 4);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, loading]);

  let userLogout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin: userLogin,
        user: user,
        authToken: authToken,
        userLogout: userLogout,
        errMessage: errMessage,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
