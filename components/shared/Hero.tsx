import Tag from "../ui/Tag";
import Overlay from "../ui/Overlay";
import Link from "next/link";
import Image from "next/image";
import { PostTypes } from "@/types/postTypes";
import { formatDate } from "@/utils/formatDate";

const Hero = ({ post }: { post: PostTypes }) => {
  console.log(post);

  return (
    <section className="relative rounded-lg overflow-hidden border border-border">
      <div className="relative h-[500px] w-full ">
        <Image
          src={post.img as string}
          fill
          className="object-cover"
          alt={`Image for ${post.title}`}
        />
        <div className="bg-gradient-to-b from-black/50 to-black/80  w-full h-full absolute top-0 z-1 "></div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center text-white ">
        <Tag text={post.category} />
        <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center font-bold uppercase ">
          {post.title}
        </h1>

        <div className="flex justify-center items-center gap-3 mt-5 text-muted-foreground">
          <Image
            src={post.user.image as string}
            alt="User Image"
            height={30}
            width={30}
            className="rounded-full object-cover"
          />
          <h1>{post.user.name}</h1>
          <h1 className="ml-5">{formatDate(post.createdAt.toString())}</h1>
        </div>
        <Link
          href={`/blog/${post.id}`}
          className="py-3 px-5 outline mt-10 rounded-3xl outline-1 text-white hover:bg-white hover:text-black transition-all duration-300 ease-in font-semibold"
        >
          Read Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
