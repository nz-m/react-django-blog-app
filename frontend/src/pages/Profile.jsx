import React, { useEffect, useState, useContext } from "react";
import Blog from "../components/Blog";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
// show create blog button only if user is logged in

const Profile = () => {
  const URL = "http://127.0.0.1:8000/api/blogs/myblogs/";

  const {authToken } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      });
      const data = await response.json();
      setBlogs(data);
    };
    getBlogs();
  }, [authToken]);

  return (
    <>
      <h1>Profile</h1>
      <button>
        <Link to="/create">Create Blog</Link>
      </button>

      {blogs.map((blog) => {
        const {
          id,
          title,
          content,
          author_name,
          date_created,
          date_updated,
          image,
          category,
          total_likes
        } = blog;
        return (
          <Blog
            key={id}
            id={id}
            title={title}
            content={content}
            author_name={author_name}
            date_created={date_created}
            date_updated={date_updated}
            image={image}
            category={category}
            total_likes={total_likes}
          />
        );
      })}
    </>
  );
};

export default Profile;
