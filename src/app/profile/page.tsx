"use client";

import Image from "next/image";
import {redirect} from "next/navigation";
import {Icon} from "@iconify/react/dist/iconify.js";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Loading from "@/components/Loading";
import MyPosts from "@/components/MyPosts";
import "../../styles/globals.css";

export default function Profile() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const {data: session} = useSession();
  const [userPosts, setUserPosts] = useState<any[]>([]); // Initialize with empty array
  const [userLikedPosts, setUserLikedPosts] = useState<any[]>([]); // Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("myPosts");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `/api/posts?email=${session?.user?.email}`
        );
        if (response.ok) {
          const posts = await response.json();
          setUserPosts(posts);
        } else {
          console.error("Failed to fetch user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserLikedPosts = async () => {
      try {
        const response = await fetch(
          `/api/likedposts?email=${session?.user?.email}`
        );
        if (response.ok) {
          const posts = await response.json();
          setUserLikedPosts(posts);
        } else {
          console.error("Failed to fetch user liked posts");
        }
      } catch (error) {
        console.error("Error fetching user liked posts", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserPosts();
      fetchUserLikedPosts();
    } else {
      redirect("/api/auth/signin?callbackUrl=/");
    }
  }, [session]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const renderComponent = () => {
    if (selectedTab === "myPosts") {
      return (
        <MyPosts
          userPosts={userPosts}
          setHoveredIndex={setHoveredIndex}
          hoveredIndex={hoveredIndex}
        />
      );
    } else if (selectedTab === "likedPosts") {
      return (
        <MyPosts
          userPosts={userLikedPosts}
          setHoveredIndex={setHoveredIndex}
          hoveredIndex={hoveredIndex}
        />
      );
    }
  };

  return (
    <>
      {session ? (
        <div className="p-4 bg-primary h-screen flex flex-col sm:ml-64">
          <div className="container mx-auto flex flex-col bg-black bg-opacity-15 rounded-lg w-full 2xl:w-4/6 p-4">
            <div className="flex items-center gap-10 mx-auto mb-2">
              <Image
                src={session.user?.image || ""}
                alt={session.user?.name || ""}
                width={500}
                height={500}
                priority
                className="rounded-full w-40 h-40"
              />
              <div>
                <h2 className="text-white text-xl">{session.user?.name}</h2>
                <p className="text-accent text-md">{session.user?.email}</p>
                <div className="mx-auto flex items-center gap-3 mt-2">
                  <div className="bg-accent rounded-md text-white py-1 px-2">
                    {userPosts?.length} posts
                  </div>
                  <div className="bg-accent rounded-md text-white py-1 px-2">
                    0 followers
                  </div>
                  <div className="bg-accent rounded-md text-white py-1 px-2">
                    0 following
                  </div>
                </div>
              </div>
            </div>

            <div className="my-10 outline outline-1 outline-accent"></div>
          </div>

          <div className="container mx-auto flex items-center w-full 2xl:w-4/6 py-4">
            <div
              className={`py-3 px-8 hover:bg-lightPurple transition-all duration-300 cursor-pointer rounded-tl-xl rounded-bl-lg flex items-center gap-3 ${
                selectedTab === "myPosts"
                  ? "bg-purple"
                  : "bg-black bg-opacity-15"
              }`}
              onClick={() => handleTabClick("myPosts")}>
              <Icon
                icon="akar-icons:image"
                className="w-6 h-6 text-white"></Icon>
              <p className="text-white">My Posts</p>
            </div>
            <div
              className={`py-3 px-8 hover:bg-lightPurple transition-all duration-300 cursor-pointer rounded-tr-xl rounded-br-lg flex items-center gap-3 ${
                selectedTab === "likedPosts"
                  ? "bg-purple"
                  : "bg-black bg-opacity-15"
              }`}
              onClick={() => handleTabClick("likedPosts")}>
              <Icon icon="akar-icons:heart" className="text-white w-6 h-6" />
              <p className="text-white">Liked Posts</p>
            </div>
          </div>

          {/* This div now takes the remaining space of the h-screen */}
          <div className="flex-grow container mx-auto flex flex-col rounded-lg w-full 2xl:w-4/6 py-4 overflow-y-auto">
            {loading ? <Loading /> : <div>{renderComponent()}</div>}
          </div>
        </div>
      ) : (
        <div>
          <h1>You are not signed in!!</h1>
        </div>
      )}
    </>
  );
}
