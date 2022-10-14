import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

// Only user who created the blog can edit and delete the blog
const BlogDetails = () => {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const URL = "http://127.0.0.1:8000/api/blogs/";
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});
  const { blog, comments } = blogData;
  useEffect(() => {
    const getBlog = async () => {
      const response = await axios.get(`${URL}${id}`);
      const data = await response.data;
      setBlogData(data);
    };
    getBlog();
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
    likes: userLiked,
  } = blog || {};

  const [likes, setLikes] = useState(total_likes);

  useEffect(() => {
    setLikes(total_likes);
  }, [total_likes]);

  const handleEdit = () => {
    navigate(`/edit/${id}`, { state: { blog } });
  };

  const handleDelete = async () => {
    await fetch(`http://127.0.0.1:8000/api/blogs/${id}/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + String(authToken.access),
      },
    });

    navigate("/");
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
    setLikes(data.total_likes);
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
    setLikes(data.total_likes);
  };

  // comment section

  const [comment, setComment] = useState("");
  const URL_COMMENT = "http://127.0.0.1:8000/api/comments/create/";

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const response = await fetch(URL_COMMENT, {
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
    setBlogData((prev) => {
      return {
        ...prev,
        comments: [...prev.comments, data],
      };
    });
    setComment("");
  };

  const handleChangeComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleDeleteComment = async (commentId) => {
    await fetch(`http://127.0.0.1:8000/api/comments/${commentId}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authToken.access),
      },
    });

    setBlogData((prev) => {
      return {
        ...prev,
        comments: prev.comments.filter((comment) => comment.id !== commentId),
      };
    });
  };

  return (
    <>
      <pre>{JSON.stringify(blogData, null, 2)}</pre>

      <h1>Title : {title}</h1>
      <p>Content : {content}</p>
      <p>Author : {author_name}</p>
      <p>Added : {date_created}</p>
      <p>Updated : {date_updated}</p>
      <img
        src={`http://127.0.0.1:8000${image}`}
        alt="blog"
        style={{ width: "200px", height: "200px" }}
      />

      <p>Category : {category}</p>
      <p>Likes : {likes}</p>

      {localStorage.getItem("authToken") && (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}> Delete</button>
        </>
      )}

      <h1>Comments</h1>
      {comments?.map((comment) => {
        const { id, username, body, date_format } = comment;
        return (
          <div
            key={id}
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              flexDirection: "column",
            }}
          >
            <p>User : {username}</p>
            <p>Body : {body}</p>
            <p>Date : {date_format}</p>

            {user?.username === username && (
              <button onClick={() => handleDeleteComment(id)}>
                Delete Comment
              </button>
            )}
          </div>
        );
      })}

      {user &&
        (userLiked?.includes(user.user_id) ? (
          <button onClick={handleUnlike}>
            Unlike
            {likes}
          </button>
        ) : (
          <button onClick={handleLike}>Like</button>
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
