export const dynamic = "force-dynamic";

import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { category: string } }
) => {
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
};
