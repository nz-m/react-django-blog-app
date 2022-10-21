import React, { useEffect, useState, useContext } from "react";
import Blog from "../components/Blog";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const URL = `${BASE_URL}/api/blogs/myblogs/`;
  const [loading, setLoading] = useState(false);
  const { user, authToken } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setLoading(true);
    const getBlogs = async () => {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      });
      const data = await response.json();
      setBlogs(data);
    };
    getBlogs();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/profile/${user.user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      });
      const data = await response.json();
      setProfile(data);
    };
    getProfile();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  if (!user) {
    return (
      <>
        <h1>
          You are logged out. Please
          <Link to="/login">
            <span className="text-emerald-600"> Login </span>
          </Link>
          first to view your profile.
        </h1>
      </>
    );
  } else {
    return (
      <>
        {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Loader type={"bubbles"} color={"deepskyblue"} />
        </div>
      )}
    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center">
          <div className="space-y-5">
            <p className="text-6xl font-semibold">
              Welcome <span className="text-primary">{profile.username} </span> to Dashboard
            </p>
            <p className="text-lg">
              You can create multiple blog with multiple category so now let's
              get started
            </p>
            <button className="btn bg-cyan-500 border-none mt-5" to="/create">
              {" "}
              <Link to="/create">Create Blog</Link>
            </button>
          </div>
          <img
            className="max-w-lg rounded-full"
            src={`${BASE_URL}${profile.photo}`}
            alt=""
          />
        </div>
        <p className="text-4xl font-bold text-center blog-title my-10">My Blog</p>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {blogs.map((blog) => {
            return (
              <Blog
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                author_name={blog.author_name}
                date_created={blog.date_created}
                date_updated={blog.date_updated}
                image={blog.image}
                category={blog.category}
                total_likes={blog.total_likes}
                reading_time={blog.reading_time}
                author_bio={blog.author_bio}
                author_photo={blog.author_photo}
                comment_count={blog.comment_count}
              />
            );
          })}
        </div>
      </>
    );
  }
};

export default Profile;
