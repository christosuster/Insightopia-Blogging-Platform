"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import Button from "../ui/Button";
import { PostTypes } from "@/types/postTypes";

const LatestPost = ({ posts }: { posts: PostTypes[] }) => {
  const [visibleBlogs, setVisibleBlogs] = useState(5);

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
  };

  return (
    <section
      className="col-span-12 lg:col-span-8 "
      aria-labelledby="latest-post"
    >
      <div className="flex flex-col gap-10 h-full">
        {posts.slice(0, visibleBlogs).map((post, id) => (
          <BlogCard post={post} key={id} />
        ))}
        {visibleBlogs < posts.length && (
          <div className="flex justify-center">
            <Button
              onClick={showMoreBlogs}
              text="Show more"
              aria="Show more blog post"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestPost;
