import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// fields =  {

//         "title": "This is from post reqgfsdgdfuest",
//         "content": "This is tdasdasdest blodasg",
//         "category": "technology",
//         "author": 1
//     }

const CreateBlog = () => {
  const URL = "http://127.0.0.1:8000/api/blogs/create/";
  const navigate = useNavigate();
  const [category, setCategory] = useState({});

  const { user ,authToken} = useContext(AuthContext);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    author: user.user_id,
  });

  useEffect(() => {
    const getCategory = () => {
      const fetchCategory = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/blogs/category/"
        );
        const data = await response.json();
        setCategory(data);
      };
      fetchCategory();
    };
    getCategory();
  }, []);

  const categoryArray = Object.entries(category);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    setBlog((prev) => {
      return {
        ...prev,
        [name]: files[0],
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("category", blog.category);
    formData.append("image", blog.image);
    formData.append("author", blog.author);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + String(authToken.access),
      },
      body: formData,
    };
    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/profile");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <pre>{JSON.stringify(category)}</pre>
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={blog.title}
          onChange={handleChange}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={blog.content}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={blog.category}
          onChange={handleChange}
        >
          {categoryArray.map((cat) => {
            return (
              <option key={cat[0]} value={cat[1]}>
                {cat[1]}
              </option>
            );
          })}
        </select>
        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" onChange={handleFile} />
        <button type="submit">Create Blog</button>
      </form>
    </>
  );
};

export default CreateBlog;
