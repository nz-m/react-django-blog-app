import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import createblog from '../Assets/createblog.png'
const CreateBlog = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const URL = `${BASE_URL}/api/blogs/create/`;

  const navigate = useNavigate();
  const [category, setCategory] = useState({});

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
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      <div className="flex flex-col items-center justify-center  md:h-screen lg:py-0">
        <div className="w-full bg-primary-neutral  rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 ">
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
                  className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
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

                <textarea
                  className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                  name="content"
                  id="content"
                  cols="30"
                  rows="6"
                  value={blog.content}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium  "
                >
                  Category
                </label>

                <select
                  className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
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
                  className="bg-primary-base shadow-lg  sm:text-sm rounded-lg focus:ring-primary  block w-full p-2.5 focus:outline-none"
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFile}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Create Blog
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <img className="w-full" src={createblog} alt="" />
      </div>
    </div>
  );
};

export default CreateBlog;
