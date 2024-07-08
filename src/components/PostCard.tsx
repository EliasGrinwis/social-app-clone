"use client";

import {Post} from "@/lib/definitions";
import {calculateTimeDifferenceBetweenNowAndPostCreated} from "@/lib/utils";
import Image from "next/image";
import {Icon} from "@iconify/react";
import {createLikePost} from "@/lib/actions";
import DropdownMenu from "./DropdownMenu";
import Modal from "./Modal";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function PostCard(post: Post) {
  const limitedavatars = post.postlikes.slice(0, 3);
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  const handleCreateLikePost = (
    postId: string,
    username: string,
    userimage: string,
    useremail: string
  ) => {
    try {
      createLikePost(postId, username, userimage, useremail);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  return (
    <div
      key={post.id}
      className="mx-auto bg-black bg-opacity-15 rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={post.userimage || ""}
            alt={post.username}
            className="rounded-full h-12 w-12 cursor-pointer"
            width={40}
            height={40}
          />
          <div>
            <p className="text-white text-lg">{post.username}</p>
            <p className="text-accent text-md flex items-center gap-4">
              <span className="text tracking-tighter">
                {calculateTimeDifferenceBetweenNowAndPostCreated(post.created)}{" "}
                ago
              </span>
            </p>
          </div>
        </div>
        <DropdownMenu />
      </div>

      <div>
        <div className="pt-3 mb-4 w-full">
          <Image
            className="w-full h-[585px] rounded-md object-cover cursor-pointer"
            src={post.image}
            alt={post.title}
            width={500}
            height={500}
            unoptimized={true}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon
              onClick={() =>
                handleCreateLikePost(
                  post.id,
                  session?.user?.name || "",
                  session?.user?.image || "",
                  session?.user?.email || ""
                )
              }
              icon="material-symbols:heart-plus-outline-rounded"
              className="w-7 h-7 text-purple cursor-pointer"
            />
            <Icon
              icon="material-symbols:mode-comment-outline-rounded"
              className="w-7 h-7 text-purple cursor-pointer"
            />
          </div>
          <div>
            <Icon
              icon="material-symbols:bookmark-outline-rounded"
              className="w-7 h-7 text-purple cursor-pointer"
            />
          </div>
        </div>

        <div className="py-2 flex items-center gap-2">
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {post.postlikes.length < 3 ? (
              <Modal
                title={"Vind-ik-leuks"}
                text={`${post.likes} vind-ik-leuks`}
                data={post.postlikes}
              />
            ) : (
              <div className="flex gap-3">
                <div className="flex -space-x-4 rtl:space-x-reverse">
                  {limitedavatars.map((like, index) => (
                    <Image
                      key={index}
                      width={40}
                      height={40}
                      className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                      src={`${post.postlikes[index].userimage}`} // Adjust the path to your image based on the like data
                      alt={`Profile Picture ${index + 1}`}
                    />
                  ))}
                </div>

                <Modal
                  title={"Vind-ik-leuks"}
                  text={`${post.likes} vind-ik-leuks`}
                  data={post.postlikes}
                />
              </div>
            )}
          </div>
        </div>

        <h2 className="text-white">{post.title}</h2>
        <p className="text-accent text-md ">{post.description}</p>
      </div>
    </div>
  );
}
