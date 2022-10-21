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
        <h1 className="text-white">
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

        <div className="flex flex-wrap md:flex-nowrap justify-around items-center">
          <div className="space-y-5">
            <p className="text-4xl font-semibold">
              Hi! <span className="text-primary">{profile.username}.</span>{" "}
              welcome to
              <span className="site-logo">
                <span className="text-primary"> B</span>log
                <span className="text-primary">H</span>ub
              </span>
            </p>
            <p className="text-lg font-semibold">
              {blogs.length > 0 ? (
                <>
                  You have written{" "}
                  <span className="text-primary">{blogs.length}</span>
                  {blogs.length > 1 ? " blogs" : " blog"} so far.
                </>
              ) : (
                <>
                  You have not written any blogs yet. Write your first blog now!
                </>
              )}
            </p>
            <button
              className="btn btn-sm bg-blue-500 text-white capitalize"
              to="/create"
            >
              {" "}
              <Link to="/create">Create blog</Link>
            </button>
          </div>
          <img
            className="max-w-md  rounded-full"
            src={`${BASE_URL}${profile.photo}`}
            alt=""
          />
        </div>

        {blogs.length > 0 && (
          <>
            <p className="text-3xl font-bold text-center blog-title my-10">
              My Blogs
            </p>
          </>
        )}

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
