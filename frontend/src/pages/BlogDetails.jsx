import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Comment from "../components/Comment";
import { GetContent } from "../services/GetContent";

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
      <div className="blog-details">
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
      </div>

      <p>Category : {category}</p>
      <p>Likes :{total_likes}</p>

      {user && user.username === blog.author_name ? (
        <>
          <button onClick={handleDelete}>delete blog</button>
          <button onClick={handleEdit}>edit blog</button>
        </>
      ) : null}

      {/* Like button */}

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
      )}

      <h1>Comments</h1>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          user={user}
          handleDeleteComment={handleDeleteComment}
        />
      ))}

      <h2>Comment adding form</h2>
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={handleChangeComment}
        />
        <button type="submit">Add Comment</button>
      </form>
    </>
  );
};

export default BlogDetails;
