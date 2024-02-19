import Tag from "@/components/ui/Tag";
import Image from "next/image";
import { PostTypes } from "@/types/postTypes";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import Link from "next/link";
import { categories } from "@/constants/categories";

const getData = async (id: string) => {
  const res = await fetch(`https://insightopia-blogging-platform.vercel.app/api/post/${id}`);

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const page = async ({ params }: { params: PostTypes }) => {
  const { id } = params;
  const post: PostTypes = await getData(id);
  return (
    <div className="w-[95%] mx-auto max-w-[1450px]">
      <div className="w-full h-[400px] relative mb-5 bg-foreground/50">
        <Image
          fill
          alt="image for blog"
          src={post.img || ""}
          className="object-cover"
        />
      </div>
      <Tag text={categories.find((e) => e.link == post.category)?.type ?? ""} />{" "}
      <h2 className="text-4xl font-extrabold uppercase text-primary my-3">
        {post.title}
      </h2>
      <div className="flex md:gap-20 gap-5 relative mt-10 md:flex-row flex-col">
        <aside
          className="md:sticky
        md:top-3/4 md:h-screen
        "
        >
          <span className="uppercase text-2xl font-extrabold text-primary">
            Share:
          </span>
          <div className="flex text-3xl gap-5 text-secondary mt-2 ">
            <Link href="#" className="hover:text-accent ">
              <FaFacebookSquare />
            </Link>
            <Link href="#" className="hover:text-accent">
              <FaTwitterSquare />
            </Link>

            <Link href="#" className="hover:text-accent">
              <FaInstagramSquare />
            </Link>
          </div>
        </aside>

        <article>
          <p className="text-xl">{post.desc}</p>

          <div className="mt-5 flex gap-5 items-center">
            <Image
              src={post.user.image as string}
              width={500}
              height={500}
              alt={`Image of ${post.user.name}`}
              className="rounded-full w-20 h-20 object-cover"
            />
            <div className="flex gap-1 flex-col">
              <span>{post.user.name}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default page;
