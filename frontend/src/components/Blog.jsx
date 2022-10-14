import React from "react";
import { Link } from "react-router-dom";

const Blog = (props) => {
  const {
    id,
    title,
    content,
    author_name,
    date_created,
    date_updated,
    image,
    category,
    total_likes,

  } = props;

  return (
    <div
      style={{
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
        flexDirection: "column",
      }}
    >
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
      <p>Likes : {total_likes}</p>

      <button>
        <Link to={`/blog/${id}`}>Continue reading</Link>
      </button>
    </div>
  );
};

export default Blog;
