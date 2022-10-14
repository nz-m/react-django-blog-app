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
    <>
      <h1>Home Page</h1>
    
      {blogs.map((blog) => {
        const { id, title, content, author_name,date_created,date_updated,image, category, total_likes,likes } = blog;
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
            likes = {likes}
          />
        );
      })}
    </>
  );
};

export default Home;
