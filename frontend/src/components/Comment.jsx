import React, { memo } from "react";
import { AiOutlineDeleteRow } from "react-icons/ai";
const Comment = ({ comment, handleDeleteComment, user }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { body, username, date_format, user_photo } = comment || {};
  const handleDelete = () => {
    handleDeleteComment(comment.id);
  };

  return (
    <div
      className="bg-primary-neutral border border-primary-neutral px-6 py-3 rounded
     animate__animated animate__bounceIn"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <img
            className="w-10 h-10 rounded-full object-cover mt-2"
            src={`${BASE_URL}${user_photo}`}
            alt=""
          />
          <div className="flex flex-col -space-y-1">
            <p className="text-xl font-bold">{username}</p>
            <p className="text-xs text-gray-400 text-semibold">{date_format}</p>
          </div>
        </div>

        <div>
          {user && user.username === username ? (
            <button className="btn btn-error btn-sm" onClick={handleDelete}>
              <AiOutlineDeleteRow className="text rounded-full" />
            </button>
          ) : null}
        </div>
      </div>
      <p className="pl-12 md:text-lg">{body}</p>
    </div>
  );
};

export default memo(Comment);
