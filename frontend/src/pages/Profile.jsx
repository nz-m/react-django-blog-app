import React, { useEffect, useState, useContext } from "react";
import Blog from "../components/Blog";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
// show create blog button only if user is logged in
import rownok from '../Assets/bloghero.png'
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
      <div className="flex justify-between items-center gap-5 h-screen">
        <div className="space-y-5">
        <p className="text-6xl font-semibold">Create your blog from blogger</p>
        <p className="text-lg">You can create multiple blog with multiple category so now let's get started</p>
        <button className="btn bg-cyan-500 border-none mt-5" to="/create">  <Link to="/create">Create Blog</Link></button>
        </div>
      <img className="max-w-xl" src={rownok} alt="" />
      </div>
      
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
