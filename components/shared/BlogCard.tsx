import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Tag from "../ui/Tag";
import Overlay from "../ui/Overlay";
import Link from "next/link";
import { PostTypes } from "@/types/postTypes";
import { categories } from "@/constants/categories";

const BlogCard: React.FC<{ post: PostTypes }> = ({ post }) => {
  return (
    <Link href={`/blog/${post.id}`} className="group col-span-2 lg:col-span-1 ">
      <article className="relative rounded-lg overflow-hidden border border-border">
        <div className="w-[1000px] h-[450px] relative">
          {post.img && (
            <Image
              src={post.img}
              fill
              alt={`image for ${post.title}`}
              className="object-cover self-center transition-all  group-hover:scale-105"
            />
          )}
          <Overlay />
        </div>

        <div className="absolute top-0 p-5">
          <Tag
            text={categories.find((e) => e.link == post.category)?.type ?? ""}
          />
        </div>

        <div className="absolute w-full h-full bottom-0 p-5 flex flex-col justify-end items-start text-left  ">
          <div className="group-hover:text-white text-white/50 flex gap-3 mb-3 items-center duration-300">
            <Image
              src={post.user.image as string}
              alt="Author image"
              className="object-cover rounded-full"
              height={25}
              width={25}
            />
            <h1 className="text-lg ">{post.user.name}</h1>
            <h1 className="text-sm  ml-5 ">
              {new Date(post.createdAt).toLocaleDateString()}
            </h1>
          </div>

          <h3 className="text-3xl font-extrabold uppercase group-hover:text-white text-white/80 duration-300">
            {post.title}
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
