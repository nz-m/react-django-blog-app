import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

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
      nagivate("/login",{ state: { message: "Successfully registered!" } });
    } else {
      setMessage(data.detail);
    }
  };

  return (
    <>
      {message ? message : <h1> No message</h1>}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h1>SignUp form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />

        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={user.confirm_password}
          onChange={handleChange}
        />

        <label htmlFor="first_name">First Name</label>

        <input
          type="text"
          name="first_name"
          id="first_name"
          value={user.first_name}
          onChange={handleChange}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={user.last_name}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
