import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import axios from "axios";
const Home = () => {
  const URL = "http://127.0.0.1:8000/api/blogs/";

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(URL);
      const data = await response.data;
      setBlogs(data);
    };
    getBlogs();
  }, []);
  return (
    <div className="grid grid-cols-2">


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
            likes={blog.likes}
            reading_time={blog.reading_time}
          />
      
       
        );
      })}
    </div>
  );
};

export default Home;
