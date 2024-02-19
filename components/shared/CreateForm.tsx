"use client";

import Form from "../ui/Form";
import Input from "../ui/Input";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { SingleImageDropzone } from "../ui/SingleImageDropZone";
import { userTypes } from "@/types/userTypes";
import { createPost } from "@/app/actions/blogActions";
import { categories } from "@/constants/categories";
import { useRouter } from "next/navigation";

const CreateForm = ({ user }: { user: userTypes }) => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const uploadImageHandler = async () => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      setImagePath(res.url);
    }
  };

  useEffect(() => {
    if (file) {
      uploadImageHandler();
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setFile(undefined);
  };

  return (
    <div className="bg-background py-8 shadow-lg rounded-lg px-10 mx-auto w-full max-w-3xl">
      <h1 className="text-center text-3xl font-bold text-foreground mb-10">
        Create a Post ✍️
      </h1>
      {!user ? (
        <h2 className="text-center text-xl font-extrabold uppercase">
          Please Sign up or Log in to create a post!
        </h2>
      ) : (
        <>
          <SingleImageDropzone
            onChange={(file) => {
              setFile(file);
            }}
            width={200}
            height={200}
            value={file}
          />
          <Form
            action={createPost}
            className="flex flex-col gap-5 mt-5"
            onSubmit={handleSubmit}
          >
            <Input type="hidden" name="image" value={imagePath} />
            <Input name="title" type="text" placeholder="Title" />
            <textarea
              required
              name="description"
              rows={10}
              placeholder="Content..."
              className="text-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"
            ></textarea>
            <select
              name="category"
              defaultValue="Choose a Tag"
              required
              className="text-foreground  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"
            >
              {categories.map((category) => (
                <option key={category.link} value={category.link}>
                  {category.type}
                </option>
              ))}
            </select>

            <Input name="email" type="hidden" value={user?.email || ""} />

            {loading ? (
              <p className="text-2xl text-primary font-bold text-center">
                Creating Post...
              </p>
            ) : (
              <Button
                disabled={loading}
                type="submit"
                text="Create"
                aria="create blog"
              />
            )}
          </Form>
        </>
      )}
    </div>
  );
};

export default CreateForm;
