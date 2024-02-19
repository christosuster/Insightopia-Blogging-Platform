import Hero from "@/components/shared/Hero";
import LatestPost from "@/components/shared/LatestPost";
import SideSection from "@/components/shared/SideSection";
import prisma from "@/lib/prismadb";
const Home = async () => {
  const posts = await prisma.blog.findMany({
    include: {
      user: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  const filteredPosts = posts.filter((post, idx) => idx != 0);

  return (
    <>
      <Hero post={posts[0]} />
      <div className="grid grid-cols-12 lg:gap-10  overflow-y-hidden h-fit mt-10 gap-5">
        <LatestPost posts={filteredPosts} />
        <SideSection />
      </div>
    </>
  );
};

export default Home;
