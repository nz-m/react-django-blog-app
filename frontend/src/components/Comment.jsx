import React, { memo } from "react";
import rownok from '../Assets/rownok.jpeg'
import {AiOutlineDeleteRow} from 'react-icons/ai'
const Comment = ({ comment, handleDeleteComment, user }) => {
  const { body, username, date_format } = comment || {};

  const handleDelete = () => {
    handleDeleteComment(comment.id);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl animate__animated animate__bounce">

<div className="flex items-start justify-between">
  <div className="flex gap-2">
  <img className="w-10 h-10 rounded-full object-cover mt-2" src={rownok} alt="" />
        <div className="flex flex-col -space-y-1">
          <p className="text-xl font-medium">{username}</p>
          <p className="text-xs text-gray-500">{date_format}</p>
        </div>
  </div>
      
<div className="">
{user && user.username === username ? (
          <button className="btn btn-primary btn-sm" onClick={handleDelete}>
            <AiOutlineDeleteRow className="text-2xl rounded-full"/>
          </button>
        ) : null}
</div>
     
      </div>
      <p className="pl-12 text-lg">{body}</p>

     
    </div>
  );
};

export default memo(Comment);
