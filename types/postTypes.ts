import { User } from "@prisma/client";

export interface PostTypes {
  id: string;
  createdAt: string | Date;
  title: string;
  img: string | null;
  desc: string;
  category: string;
  user: User;
}
