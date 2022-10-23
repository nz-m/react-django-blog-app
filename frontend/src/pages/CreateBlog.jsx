import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FileValidation from "../services/FileValidation";

const CreateBlog = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const URL = `${BASE_URL}/api/blogs/create/`;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const [value, setValue] = useState("");
  const { user, authToken } = useContext(AuthContext);

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
        const response = await fetch(`${BASE_URL}/api/blogs/category/`);
        const data = await response.json();
        setCategory(data);
      };
      fetchCategory();
    };
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleEditorChange = (value) => {
    setValue(value);
    setBlog((prev) => {
      return {
        ...prev,
        content: value,
      };
    });
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    FileValidation(files, setMessage, e);
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
        navigate("/profile");
      });
  };

  return (
    <div className="items-center">
      <div className="flex flex-col items-center justify-center  md:h-screen lg:py-0">
        <div className="w-full bg-slate-800  rounded shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Create a blog
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium  "
                >
                  Title
                </label>
                <input
                  className="bg-primary-base sm:text-sm rounded focus:ring-primary block w-full p-2.5 focus:outline-none"
                  type="text"
                  name="title"
                  id="title"
                  value={blog.title}
                  onChange={handleChange}
                  placeholder="Title of your blog"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium  "
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
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium  "
                >
                  Category
                </label>

                <select
                  className="bg-primary-base shadow-lg  sm:text-sm rounded focus:ring-primary  block w-full p-2.5 focus:outline-none"
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
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  "
                >
                  File Upload
                </label>

                <input
                  className="bg-primary-base sm:text-sm rounded-sm focus:ring-primary  block w-full p-2.5"
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFile}
                />
                {message && (
                  <div className="text-primary-error text-center mt-2">
                    {message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Create Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
