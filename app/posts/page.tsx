"use client";
import BlogCard from "@/components/shared/BlogCard";
import clsx from "clsx";
import { categories } from "@/constants/categories";
import { PostTypes } from "@/types/postTypes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
const page = () => {
  const [posts, setPosts] = useState<PostTypes[]>([]);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (selectedCategory === null) {
      fetch(`https://insightopia-blogging-platform.vercel.app/api/getPosts/all`)
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .finally(() => setLoading(false));
      return;
    }

    fetch(
      `https://insightopia-blogging-platform.vercel.app/api/getPosts/${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-2 w-[95%] max-w-[1250px] mx-auto ">
      <div className="flex justify-center gap-2  flex-wrap col-span-2 mb-10">
        <Link
          className={clsx(
            selectedCategory === null
              ? "bg-primary text-background"
              : "text-primary bg-background",
            "px-4 border-primary font-bold border-2 py-2 rounded hover:shadow-lg hover:bg-secondary hover:text-background hover:border-secondary"
          )}
          href={`/posts`}
        >
          All
        </Link>
        {categories.map((item) => (
          <Link
            key={item.link}
            className={clsx(
              selectedCategory === item.link
                ? "bg-primary text-background"
                : "text-primary bg-background",
              "px-4 border-primary font-bold border-2 py-2 rounded hover:shadow-lg hover:bg-secondary hover:text-background hover:border-secondary"
            )}
            href={`/posts/?category=${item.link}`}
          >
            {item.type}
          </Link>
        ))}
      </div>

      {loading ? (
        <div className="col-span-2 flex justify-center items-center h-[50vh]">
          <Loader2 size={50} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10 h-full col-span-2">
          {posts.map((post, id) => (
            <BlogCard post={post} key={id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
