import prisma from "@/lib/prismadb";
import { NextApiRequest } from "next";

export async function GET(
  req: NextApiRequest,
  context: { params: { category: string } }
) {
  const { category } = context.params;

  if (category === "all") {
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

    return Response.json(posts);
  }

  const posts = await prisma.blog.findMany({
    where: {
      category,
    },
    include: {
      user: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return Response.json(posts);
}
