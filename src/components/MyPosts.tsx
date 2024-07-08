import {Post} from "@/lib/definitions";
import {Icon} from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

export default function MyPosts({
  userPosts,
  setHoveredIndex,
  hoveredIndex,
  type,
}: any) {
  return (
    <div>
      {userPosts && userPosts.length === 0 ? (
        <div className="text-center mt-8">
          {type === "myPosts" ? (
            <div>
              <h1 className="text-2xl font-semibold text-white">
                No posts found
              </h1>
              <p className="text-md text-accent">
                You have not created any posts yet.
              </p>
            </div>
          ) : (
            type === "likedPosts" && (
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  No liked posts found
                </h1>
                <p className="text-md text-accent">
                  You have not liked any posts yet.
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {userPosts.map((post: Post, index: number) => (
            <Link key={post.id} href={`/post/detail/${post.id}`}>
              <div
                className="rounded-lg relative h-64 overflow-hidden bg-primary transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <Image
                  src={post.image}
                  alt={post.description}
                  className="w-full h-full object-cover rounded-xl"
                  width={300}
                  height={300}
                />

                {hoveredIndex === index && (
                  <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center hover:bg-black hover:bg-opacity-35 cursor-pointer">
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
