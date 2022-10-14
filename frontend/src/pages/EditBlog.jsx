import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const EditBlog = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { blog } = state;
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);

  const [blogData, setBlogData] = useState(blog);
  const [imageUpdate, setImageUpdate] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };
  const handleImage = (e) => {
    setImageUpdate(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { title, content, category } = blogData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (imageUpdate) {
      formData.append("image", imageUpdate);
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/blogs/${id}/update/`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + String(authToken.access),
        },
        body: formData,
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      navigate(`/blog/${id}`);
    } else {
      alert(data);
    }
  };

  return (
    <>
      <pre>{JSON.stringify(blogData, null, 2)}</pre>

      <h2>
        {blogData.title}
        {blogData.content}
        {blogData.image}
      </h2>

      <div>
        <p>Author : {blogData.author_name}</p>

        <p>Date Added : {blogData.date_created}</p>

        <p>Last Update : {blogData.date_updated}</p>
        <p> Total likes : {blogData.likes}</p>
        <p>category {blogData.category}</p>
      </div>

      <form onSubmit={handleUpdate}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={blogData.title}
          onChange={handleChange}
          name="title"
          id="title"
        />

        <label htmlFor="content">Content</label>
        <input
          type="text"
          value={blogData.content}
          onChange={handleChange}
          name="content"
          id="content"
        />

        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleImage} name="image" id="image" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default EditBlog;
