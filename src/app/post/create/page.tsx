"use client";

import Toast from "@/components/Toast";
import UploadFile from "@/components/UploadFile";
import {createPost} from "@/lib/actions";
import {Post} from "@/lib/definitions";
import {Icon} from "@iconify/react/dist/iconify.js";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {redirect} from "next/navigation";
import {useState} from "react";

export default function CreatePostPage() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 2);

  const createdTimestamp = currentDate.toISOString();
  const updatedTimestamp = currentDate.toISOString();
  const [message, setMessage] = useState("");

  const [post, setPost] = useState<Post>({
    title: "",
    description: "",
    likes: 0,
    image: "",
    created: createdTimestamp,
    updated: updatedTimestamp,
    username: session?.user?.name || "",
    userimage: session?.user?.image || "",
    useremail: session?.user?.email || "",
  } as Post);

  const handleCreatePost = async () => {
    try {
      console.log(post);
      await createPost(post);
      setMessage("Post created successfully");
      setPost({
        title: "",
        description: "",
        likes: 0,
        image: "",
        created: createdTimestamp,
        updated: updatedTimestamp,
        username: session?.user?.name || "",
        userimage: session?.user?.image || "",
        useremail: session?.user?.email || "",
      } as Post);
    } catch (error) {
      console.error("Error creating post", error);
      setMessage("Error creating post");
    }
  };

  return (
    <div className="p-4 bg-primary min-h-screen sm:ml-64">
      <div className="flex justify-end">
        {message && (
          <Toast type="success" message={message} setMessage={setMessage} />
        )}
      </div>
      <div className="container mx-auto p-4 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-10 mx-auto w-full max-w-5xl">
          <Icon
            icon="material-symbols:add-box-outline-rounded"
            className="w-10 h-10 text-white"
          />
          <h1 className="text-white text-3xl font-bold">Create Post</h1>
        </div>

        <div className="max-w-5xl bg-black bg-opacity-15 rounded-3xl p-5 w-full mx-auto">
          <div>
            <label className="text-white">Title</label>
            <input
              type="text"
              onChange={(e) => setPost({...post, title: e.target.value})}
              className="block bg-secondaryLight mt-2 rounded-xl h-14 w-full text-white p-4 placeholder:text-accent  focus:outline-none focus:border-purple"
              placeholder="Enter here your title of your post"
            />
          </div>
          <div className="pt-10">
            <label className="text-white">Add Photos</label>
            <div className="bg-secondaryLight relative overflow-hidden mt-2 rounded-xl h-96 w-full text-white placeholder:text-white p-4 flex flex-col items-center justify-center">
              {post.image ? (
                <Image
                  src={post.image}
                  alt="preview"
                  className="absolute inset-0 w-[100%] h-[100%] object-contain rounded-xl"
                  unoptimized={true}
                  width={500}
                  height={500}
                />
              ) : (
                <>
                  <Icon
                    icon="bx:bxs-image-add"
                    className="text-white w-10 h-10"
                  />
                  <p className="text-white mt-2 mb-4">
                    Drag and drop your photos here
                  </p>
                  <UploadFile setPost={setPost} />
                </>
              )}
            </div>
          </div>
          <div className="pt-10">
            <label className="text-white">Description</label>
            <input
              type="text"
              onChange={(e) => setPost({...post, description: e.target.value})}
              className="block bg-secondaryLight mt-2 rounded-xl h-14 w-full text-white p-4 placeholder:text-accent focus:outline-none focus:border-purple"
              placeholder="Enter here your description of your post"
            />
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => handleCreatePost()}
              className={`bg-purple hover:bg-lightPurple p-3 rounded-md mt-5 text-white w-32 `}>
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
