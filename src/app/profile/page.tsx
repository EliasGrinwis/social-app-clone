"use client";

import Image from "next/image";
import {redirect} from "next/navigation";
import {fetchPostsByUserEmail} from "@/lib/data";
import {Icon} from "@iconify/react/dist/iconify.js";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {Post} from "@/lib/definitions";
import Loading from "@/components/Loading";

export default function Profile() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const {data: session, status} = useSession();
  const [userPosts, setUserPosts] = useState<any[]>([]); // Initialize with empty array
  const [loading, setLoading] = useState(true);

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

    if (session) {
      fetchUserPosts();
    } else {
      redirect("/api/auth/signin?callbackUrl=/client");
    }
  }, [session]);

  const [selectedTab, setSelectedTab] = useState("myPosts");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      {session ? (
        <div className="p-4 bg-primary min-h-screen sm:ml-64">
          <div className="container mx-auto flex flex-col bg-black bg-opacity-15 rounded-lg xl:w-4/6 p-4">
            <div className="flex items-center gap-10 mx-auto mb-2">
              <Image
                src={session.user?.image || ""}
                alt={session.user?.name || ""}
                width={500}
                height={500}
                priority
                className="rounded-full w-40 h-40 "
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

          <div className="container mx-auto flex items-center xl:w-4/6 py-4">
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
              <p className="text-white ">My Posts</p>
            </div>
            <div
              className={`py-3 px-8 hover:bg-lightPurple transition-all duration-300 cursor-pointer rounded-tr-xl rounded-br-lg flex items-center gap-3 ${
                selectedTab === "likedPosts"
                  ? "bg-purple"
                  : "bg-black bg-opacity-15"
              }`}
              onClick={() => handleTabClick("likedPosts")}>
              <Icon icon="akar-icons:heart" className="text-white w-6 h-6" />
              <p className="text-white ">Liked Posts</p>
            </div>
          </div>
          <div className="container mx-auto flex flex-col rounded-lg xl:w-4/6 py-4">
            {loading ? (
              <Loading />
            ) : (
              userPosts &&
              (userPosts.length === 0 ? (
                <div className="text-center mt-8">
                  <h1 className="text-2xl font-semibold text-white">
                    No posts found
                  </h1>
                  <p className="text-md text-accent">
                    You have not created any posts yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-8">
                  {userPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="rounded-lg relative h-64 overflow-hidden bg-primary transition-all duration-300"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}>
                      <Image
                        src={post.image}
                        alt={post.description}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-xl"
                      />

                      {hoveredIndex === index && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-black bg-opacity-80 flex items-center gap-3">
                              <Icon
                                icon="akar-icons:heart"
                                className="text-purple w-6 h-6"
                              />
                              <span className="text-white">{post.likes}</span>
                            </div>
                            <div className="p-2 rounded-xl bg-black bg-opacity-80 flex items-center gap-3">
                              <Icon
                                icon="akar-icons:comment"
                                className="text-purple w-6 h-6"
                              />
                              <span className="text-white">0</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            )}
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
