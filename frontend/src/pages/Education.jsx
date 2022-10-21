import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import { GetContent } from "../services/GetContent";
import Loader from "../components/Loader";
import notfound from "../assets/notfound.png";
const Education = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    setLoading(true);
    GetContent.fetchAllBlogsByCategory("Education").then((data) => {
      data ? setBlogs(data) : setBlogs([]);
      setLoading(false);
    });
  }, []);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        {blogs.length > 0 ? (
          blogs.map((blog) => {
            return (
              <Blog
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                author_name={blog.author_name}
                author_bio={blog.author_bio}
                author_photo={blog.author_photo}
                date_created={blog.date_created}
                date_updated={blog.date_updated}
                image={blog.image}
                category={blog.category}
                total_likes={blog.total_likes}
                likes={blog.likes}
                reading_time={blog.reading_time}
                comment_count={blog.comment_count}
              />
            );
          })
        ) : (
          <>
            <div className="">
              <p className="text-5xl font-semibold text-center ">
                No blog entries found in{" "}
                <span className="text-primary">Education</span> category!
              </p>
            </div>
            <img src={notfound} alt="" />
          </>
        )}
      </div>
    </>
  );
};

export default Education;
