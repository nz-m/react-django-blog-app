import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeBtn = ({ total_likes, handleLike, isLiked, handleUnlike }) => {
  return !isLiked ? (
    <button
      className="flex items-center gap-1 text-xl cursor-pointer"
      onClick={handleLike}
    >
      <AiOutlineLike />
      <p>{total_likes}</p>
    </button>
  ) : (
    <button
      className="flex items-center gap-1 text-xl cursor-pointer"
      onClick={handleUnlike}
    >
      <AiFillLike />
      <p>{total_likes}</p>
    </button>
  );
};

export default LikeBtn;
