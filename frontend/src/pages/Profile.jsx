import React, { useEffect, useState, useContext } from "react";
import Blog from "../components/Blog";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
// show create blog button only if user is logged in

const Profile = () => {
  const URL = "http://127.0.0.1:8000/api/blogs/myblogs/";

  const { authToken } = useContext(AuthContext);
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
    <div className="grid grid-cols-1 md:grid-cols-2">
    {blogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            author_name={blog.author_name}
            date_created={blog.date_created}
            date_updated={blog.date_updated}
            image={blog.image}
            category={blog.category}
            total_likes={blog.total_likes}
            reading_time={blog.reading_time}
          />
        );
      })}
    </div>
      
    </>
  );
};

export default Profile;
