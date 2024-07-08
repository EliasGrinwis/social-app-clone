import PostCard from "@/components/PostCard";
import {fetchPosts} from "@/lib/data";

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <main className="p-4 bg-primary min-h-screen sm:ml-64">
      <div className="container mx-auto flex flex-col">
        <div className="mx-auto w-4/5 xl:w-1/2">
          {posts?.map((post, index) => (
            <PostCard
              key={index}
              id={post.id}
              description={post.description}
              title={post.title}
              likes={post.likes}
              image={post.image}
              created={post.created}
              updated={post.updated}
              username={post.username}
              userimage={post.userimage}
              useremail={post.useremail}
              postlikes={post.postlikes}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
