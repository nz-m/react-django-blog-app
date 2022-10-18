import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Comment from "../components/Comment";
import { GetContent } from "../services/GetContent";
import { Link } from "react-router-dom";
import blog from '../Assets/blog.png'
import rownok from '../Assets/rownok.jpeg'
import {AiFillLike} from 'react-icons/ai'
import {RiEditCircleFill} from 'react-icons/ri'
import {MdDelete} from 'react-icons/md'
import 'animate.css';
import {HiOutlineCalendar} from 'react-icons/hi'
import {IoIosTimer} from 'react-icons/io'
const BlogDetails = () => {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const URL_CREATE_COMMENT = "http://127.0.0.1:8000/api/comments/create/";
  const { id } = useParams();

  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    GetContent.fetchBlog(id).then((data) => {
      setBlog(data);
    });
    GetContent.fetchComments(id).then((data) => {
      setComments(data);
    });
  }, [id]);

  const {
    title,
    content,
    author_name,
    date_created,
    date_updated,
    image,
    category,
    total_likes,
    reading_time,
  } = blog || {};

  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e) => {
    if (!user) {
      navigate("/login", {
        state: { message: "Please login to comment!" },
      });
    } else {
      e.preventDefault();
      const response = await fetch(URL_CREATE_COMMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
        body: JSON.stringify({
          blog: id,
          user: user.user_id,
          body: comment,
        }),
      });
      const data = await response.json();
      setComments([...comments, data]);
      setComment("");
    }
  };

  const handleChangeComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleLike = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/blogs/${id}/addlike/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
        body: JSON.stringify({ user: user.user_id }),
      }
    );
    const data = await response.json();
    setBlog((prev) => ({ ...prev, total_likes: data.total_likes }));
  };

  const handleUnlike = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/blogs/${id}/removelike/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
        body: JSON.stringify({ user: user.user_id }),
      }
    );
    const data = await response.json();
    setBlog((prev) => ({ ...prev, total_likes: data.total_likes }));
  };

  const handleDelete = async () => {
    await fetch(`http://127.0.0.1:8000/api/blogs/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authToken.access),
      },
    });
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`, { state: { blog } });
  };

  const handleDeleteComment = useCallback(
    async (commentId) => {
      await fetch(`http://127.0.0.1:8000/api/comments/${commentId}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      });
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    },
    [authToken?.access]
  );

  return (
    <>
      {/* <div className="blog-details">
        <h2>{title}</h2>
        <p>Written by {author_name}</p>
        <p>Category: {category}</p>
        <p>Added: {date_created}</p>
        <p>Updated: {date_updated}</p>
        <p>Reading time : {reading_time}</p>
        <img
          src={`http://127.0.0.1:8000${image}`}
          alt="blog"
          style={{ width: "200px", height: "200px" }}
        />
        <p>{content}</p>
      </div> */}

      <p>Category : {category}</p>
      <p>Likes :{total_likes}</p>

     

      {/* Like button */}
{/* 
      {user ? (
        <>
          <button onClick={handleLike}>
            Like
            {total_likes}
          </button>
          <button onClick={handleUnlike}>Unlike</button>
        </>
      ) : (
        <>
          <button
            onClick={() =>
              navigate("/login", {
                state: { message: "Please login to like!" },
              })
            }
          >
            Like
            {total_likes}
          </button>
          <button onClick={() => navigate("/login")}>Unlike</button>
        </>
      )} */}


    

    

      <div className='container mx-auto  my-10 animate__animated animate__bounce'>
      <div className="rounded-2xl bg-slate-50 border border-slate-200 relative shadow-md">
        <div className="overflow-hidden rounded-t-2xl relative">
        
          <img className=' h-[500px] w-full object-cover ' src={`http://127.0.0.1:8000${image}`} alt="" />
       
    
        <p className='absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold text-white rounded-3xl cursor-pointer hover:scale-110 transition duration-500'>{category}</p>
      
        </div>
     <div className="flex justify-between px-10 pt-4">
   
     <div className="flex gap-2 items-center">
      <img className='w-10 h-10 rounded-full' src={rownok} alt="" />
      <p className='text-sm'>{author_name}</p>
            </div>



     <div className='flex items-center gap-1'>
          <HiOutlineCalendar className='font-semibold text-2xl text-blue-600'/>
          <p className="text-lg">{date_created}</p>
         
          <IoIosTimer className='text-purple-600 font-semibold text-2xl ml-4'/>
          <p className="text-lg">{reading_time}</p>
          </div>
          <div className=" flex justify-end items-center gap-2">
                {user && user.username === blog.author_name ? (
                  
        <>
          <button  onClick={handleEdit} className="bg-cyan-500 p-3 rounded-2xl hover:scale-95 cursor-pointer">
         
          <RiEditCircleFill className="text-gray-50"/>
          </button>
           
          <button onClick={handleDelete} className="bg-red-600 p-3 rounded-2xl hover:scale-95 cursor-pointer">
       
          <MdDelete className="text-gray-100"/>
          </button>
        </>
      ) : null}
        
     
        </div>
     </div>
      <div className="flex flex-col px-10 py-2">
      <div className="flex justify-between items-center">
      <p className='text-3xl  font-semibold cursor-pointer'>{title}</p>
      <div className="flex items-center gap-1 text-xl cursor-pointer">
        <AiFillLike/>
      <p>{total_likes}</p>
      </div>
      
      </div>
     
      <div className="flex gap-1 justify-center items-center">
      <p className='text-lg text-justify py-4'>{content}</p>
      </div>
    
      </div>
   
      </div>
      <h2 className="font-semibold text-xl mt-5 mb-2">Comment</h2>
      <form onSubmit={handleSubmitComment}>
        <textarea className="bg-slate-50 border border-slate-200 w-full rounded-2xl p-3 focus:outline-gray-300" name="" id="" cols="30" rows="10" placeholder="Write your thought..."
          value={comment}
          onChange={handleChangeComment}></textarea>
     <div className="flex justify-end">
     <button className="btn btn-accent text-white mb-5" type="submit">Done</button>
     </div>
     
      </form>
      <div className="flex flex-col gap-3 animate__animated animate__bounceInLeft">
   {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          user={user}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
   </div>
 
    </div>

    </>
  );
};

export default BlogDetails;
