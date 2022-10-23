import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import ReactQuill from "react-quill";
import FileValidation from "../services/FileValidation";
import "react-quill/dist/quill.snow.css";

const EditBlog = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { blog } = state;
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);

  const [blogData, setBlogData] = useState(blog);
  const [value, setValue] = useState(blog.content);
  const [imageUpdate, setImageUpdate] = useState(null);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleEditorChange = (value) => {
    setValue(value);
    setBlogData({ ...blogData, content: value });
  };

  const handleImage = (e) => {
    const { files } = e.target;
    FileValidation(files, setMessage, e);
    setImageUpdate(files[0]);
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
    const response = await fetch(`${BASE_URL}/api/blogs/${id}/update/`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + String(authToken.access),
      },
      body: formData,
    });
    const data = await response.json();
    if (response.status === 200) {
      navigate(`/blog/${id}`);
    } else {
      alert(data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 lg:py-0 my-8">
      {message && (
        <div className="error" style={{ color: "white" }}>
          {message}
        </div>
      )}

      <div className="w-full bg-slate-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
            Edit your Blog
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleUpdate}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium  "
              >
                Title
              </label>
              <input
                className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                value={blogData.title}
                onChange={handleChange}
                name="title"
                id="title"
                type="text"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Content
              </label>
              <div className="rounded overflow-hidden">
                <ReactQuill
                  className="text-black bg-slate-400 "
                  theme="snow"
                  value={value}
                  onChange={handleEditorChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium  "
              >
                File Upload
              </label>

              <input
                className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                type="file"
                name="image"
                id="image"
                onChange={handleImage}
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
