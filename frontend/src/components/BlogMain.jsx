import React from 'react'
import blog from '../Assets/blog.png'
import rownok from '../Assets/rownok.jpeg'

import {HiOutlineCalendar} from 'react-icons/hi'
import {IoIosTimer} from 'react-icons/io'
const BlogMain = () => {
  return (
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-2'>
      <div className="rounded-2xl bg-slate-50 relative">
        <div className="overflow-hidden rounded-t-2xl relative">
        <img className='hover:scale-110 transition duration-500' src={blog} alt="" />
        <p className='absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-white rounded-3xl cursor-pointer hover:scale-110 transition duration-500'>Lifestyle</p>
        </div>
     <div className="flex justify-between px-4 pt-4">
   
     <div className="flex gap-2 items-center">
      <img className='w-10 h-10 rounded-full' src={rownok} alt="" />
      <p className='text-sm'>Rownok Mahbub</p>
     </div>
     <div className='flex items-center gap-1'>
          <HiOutlineCalendar className='font-semibold text-2xl text-blue-600'/>
          <p > 05 Dec,2021</p>
         
          <IoIosTimer className='text-purple-600 font-semibold text-2xl'/>
          <p > 2 min read</p>
          </div>
     </div>
      <div className="flex flex-col px-4 py-2">
      
      <p className='text-3xl hover:underline transition duration-700 font-semibold cursor-pointer'>The meaning of health has evolved over time</p>
      <div className="flex gap-1 justify-center items-center ">
      <p className='line-clamp-1 pb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse nihil expedita earum non ut omnis magnam quas nesciunt perspiciatis. Deleniti animi at magnam qui atque molestiae nihil quisquam in eligendi. </p>
      </div>
    
      </div>
    <div className="btn btn-sm absolute -bottom-4 left-1/3 bg-gradient-to-r from-cyan-500 to-blue-500 border-none hover:scale-95">Continue Reading</div>
      </div>
     
 
    </div>
  )
}

export default BlogMain