import React from "react";
import { Link } from "react-router-dom";
import rownok from '../Assets/rownok.jpeg'
import {AiFillLike} from 'react-icons/ai'

import {HiOutlineCalendar} from 'react-icons/hi'
import {IoIosTimer} from 'react-icons/io'
const Blog = (props) => {
  const {
    id,
    title,
    content,
    author_name,
    date_created,
    image,
    category,
    total_likes,
    reading_time,
  } = props;

  return (
   
      <div className='container mx-auto my-10'>
      <div className="rounded-2xl bg-slate-50 relative shadow-lg">
        <div className="overflow-hidden rounded-t-2xl relative">
        <img className='hover:scale-110 transition duration-500 max-h-80 w-full backdrop-grayscale object-cover ' src={`http://127.0.0.1:8000${image}`} alt="" />
        <p className='absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-white rounded-3xl cursor-pointer hover:scale-110 transition duration-500'>{category}</p>
        </div>
     <div className="flex justify-between px-4 pt-4">
   
     <div className="flex gap-2 items-center">
      <img className='w-10 h-10 rounded-full' src={rownok} alt="" />
      <p className='text-sm'>{author_name}</p>
     </div>
     <div className='flex items-center gap-1'>
          <HiOutlineCalendar className='font-semibold text-2xl text-blue-600'/>
          <p >{date_created}</p>
         
          <IoIosTimer className='text-purple-600 font-semibold text-2xl'/>
          <p >{reading_time}</p>
          </div>
     </div>
      <div className="flex flex-col px-4 py-2">
      <div className="flex justify-between items-center">
      <p className='text-3xl hover:underline transition duration-700 font-semibold cursor-pointer'>{title}</p>
      <div className="flex items-center gap-1">
        <AiFillLike/>
      <p>{total_likes}</p>
      </div>
      
      </div>
     
      <div className="flex gap-1 justify-center items-center ">
      <p className='line-clamp-2 mb-4'>{content}</p>
      </div>
    
      </div>
    <div className="btn btn-sm absolute -bottom-4 left-1/3 bg-gradient-to-r from-cyan-500 to-blue-500 border-none hover:scale-95">
    <Link to={`/blog/${id}`}>Continue reading</Link>
    </div>
      </div>
     
 
    </div>
  
  );
};

export default Blog;
