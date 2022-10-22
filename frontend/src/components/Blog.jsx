import React from "react";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
const Blog = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const {
    id,
    title,
    content,
    author_name,
    author_photo,
    date_created,
    image,
    category,
    total_likes,
    reading_time,
    comment_count,
  } = props;

  return (
    <div className="mx-5 my-10">
      <div className="rounded-2xl bg-primary-neutral border-primary-neutral border relative shadow-xl">
        <div className="overflow-hidden rounded-t-2xl relative">
          <img
            className="hover:scale-110 transition duration-500 h-64 w-full backdrop-grayscale object-cover "
            src={`${BASE_URL}${image}`}
            alt=""
          />
          <p className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-white rounded-3xl cursor-pointer hover:scale-110 transition duration-500">
            {category}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-between px-4 pt-4">
          <div className="flex gap-2 items-center">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={`${BASE_URL}${author_photo}`}
              alt=""
            />
            <p className="text-sm line-clamp-1">{author_name}</p>
          </div>
          <div className="flex items-center md:gap-1">
            <HiOutlineCalendar className="font-semibold text-xl text-blue-600" />
            <p className="text-xs md:text-sm">{date_created}</p>

            <IoIosTimer className="text-purple-600 font-semibold text-xl" />
            <p className="text-xs md:text-sm">{reading_time}</p>
          </div>
        </div>
        <div className="flex flex-col px-4 py-2">
          <div className="flex justify-between items-center">
            <p className="text-2xl hover:underline transition duration-700 font-bold cursor-pointer line-clamp-1 blog-title">
              <Link to={`/blog/${id}`}>{title}</Link>
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <AiFillLike />
                <p>{total_likes}</p>
              </div>
              <div className="flex items-center gap-1">
                <FaRegComments />
                <p>{comment_count}</p>
              </div>
            </div>
          </div>

          <div>
            <ReactQuill
              value={content.slice(0, 100).concat("...")}
              readOnly={true}
              theme={"bubble"}
            />
          </div>
          <Link
            to={`/blog/${id}`}
            className="md:hidden flex justify-center items-center"
          >
            <p className="flex justify-center items-center px-3 py-1 rounded-full mb-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              Continue reading
            </p>
          </Link>
        </div>
        <button className="btn btn-sm hidden md:absolute md:flex md:-bottom-4 md:left-1/3 bg-gradient-to-r from-cyan-600 to-blue-600 border-none hover:scale-95 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 capitalize">
          <Link to={`/blog/${id}`}>Continue reading</Link>
        </button>
      </div>
    </div>
  );
};

export default Blog;
