"use client";

import DropdownMenu from "@/components/DropdownMenu";
// Import necessary modules and types
import Loading from "@/components/Loading";
import {Post} from "@/lib/definitions";
import {calculateTimeDifferenceBetweenNowAndPostCreated} from "@/lib/utils";
import {Icon} from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function DetailPage() {
  let {id} = useParams<{id: string}>() || {id: ""};
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          console.error(`Failed to fetch post with id ${id}`);
        }
      } catch (error) {
        console.error("Error fetching post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 bg-primary min-h-screen flex items-center justify-center sm:ml-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4 bg-primary min-h-screen sm:ml-64">
      <div className="container mx-auto bg-black bg-opacity-15 rounded-lg xl:w-4/6 p-4">
        {post && (
          <div>
            {/* Go back button */}
            <button
              onClick={() => window.history.back()}
              className="mb-4 flex items-center bg-purple text-white p-2 rounded-lg hover:bg-lightPurple">
              <Icon icon="akar-icons:arrow-left" className="w-6 h-6 mr-2" />
              Go back
            </button>

            {post.image && (
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
                        {calculateTimeDifferenceBetweenNowAndPostCreated(
                          post.created
                        )}{" "}
                        ago
                      </span>
                    </p>
                  </div>
                </div>
                <DropdownMenu />
              </div>
            )}

            {post.image && (
              <div className="w-full py-4">
                <Image
                  className="w-full h-auto rounded-md object-contain cursor-pointer"
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={500}
                  unoptimized={true}
                />
              </div>
            )}

            {/* Post Description */}
            <h2 className="text-white text-xl">{post.title}</h2>
            <p className="text-accent text-md">{post.description}</p>

            {/* Comments Section (placeholder) */}
            <div className="border-t border-gray-600 pt-4 mt-4">
              {/* Example Comment */}

              <form>
                <div className="w-full mb-4 border rounded-lg bg-primary border-gray-600">
                  <div className="px-4 py-2 rounded-t-lg bg-primary">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      className="w-full px-0 text-sm border-0 bg-primary focus:ring-0 text-white placeholder-gray-400"
                      placeholder="Write a comment..."
                      required></textarea>
                  </div>
                  <div
                    className="
                    items-center justify-between px-3 py-3 border-t flex">
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-purple hover:bg-lightPurple rounded-lg focus:ring-4">
                      Post comment
                    </button>
                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                      <button
                        type="button"
                        className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 12 20">
                          <path
                            stroke="currentColor"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                          />
                        </svg>
                        <span className="sr-only">Attach file</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20">
                          <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        <span className="sr-only">Set location</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18">
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                        <span className="sr-only">Upload image</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="mb-4 flex items-start">
                <Image
                  src={post.userimage || ""}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div className="ml-3">
                  <div className="flex items-center">
                    <p className="text-white text-sm">
                      John Doe{" "}
                      <span className="text-accent">
                        <span>&#8226;</span> 5h ago
                      </span>
                    </p>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Nice post! Looking forward to more. Nice post! Looking
                    forward to more. Nice post! Looking forward to more. Nice
                    post! Looking forward to more. Nice post! Looking forward to
                    more. Nice post! Looking forward to more. Nice post! Looking
                    forward to more. Nice post! Looking forward to more. Nice
                    post! Looking forward to more. Nice post! Looking forward to
                    more. Nice post! Looking forward to more. Nice post! Looking
                    forward to more. Nice post! Looking forward to more.
                  </p>
                </div>
              </div>

              {/* Add your logic to render actual comments here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
