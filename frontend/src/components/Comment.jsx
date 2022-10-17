import React, { memo } from "react";

const Comment = ({ comment, handleDeleteComment, user }) => {
  const { body, username, date_format } = comment || {};

  const handleDelete = () => {
    handleDeleteComment(comment.id);
  };

  return (
    <>
      <h1>Comment</h1>
      <div style={{ border: "1px solid black" }}>
        <p>{body}</p>
        <p>{username}</p>
        <p>{date_format}</p>
        {user && user.username === username ? (
          <button onClick={handleDelete}>Delete</button>
        ) : null}
      </div>
    </>
  );
};

export default memo(Comment);
