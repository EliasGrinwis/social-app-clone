import {sql} from "@vercel/postgres";
import {unstable_noStore as noStore} from "next/cache";
import {Post, PostLike} from "./definitions";

export async function fetchPosts(): Promise<Post[]> {
  noStore();
  try {
    // Fetch posts
    const posts = await sql`SELECT * FROM posts ORDER BY created DESC`;

    // Fetch postlikes
    const postLikes = await sql`SELECT * FROM postlikes`;

    // Group postlikes by post_id
    const postLikesGrouped: {[key: string]: PostLike[]} = postLikes.rows.reduce(
      (acc, like) => {
        if (!acc[like.post_id]) {
          acc[like.post_id] = [];
        }
        acc[like.post_id].push(like);
        return acc;
      },
      {}
    );

    // Combine posts with their corresponding postlikes
    const postsWithLikes: Post[] = posts.rows.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      likes: post.likes,
      image: post.image,
      created: post.created,
      updated: post.updated,
      username: post.username,
      userimage: post.userimage,
      useremail: post.useremail,
      postlikes: postLikesGrouped[post.id] || [], // Use the correct key
    }));

    // Stringify the postsWithLikes for better logging
    console.log("Posts with likes:", JSON.stringify(postsWithLikes, null, 2));

    return postsWithLikes;
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
}

export async function fetchPostById(id: string): Promise<Post | null> {
  noStore();
  try {
    const post = await sql`SELECT * FROM posts WHERE id = ${id}`;
    return post.rows[0] as Post;
  } catch (error) {
    console.error("Error fetching post by id", error);
    return null;
  }
}

export async function fetchPostsByUserEmail(userEmail: string) {
  noStore();
  try {
    const posts =
      await sql`SELECT * FROM posts WHERE userEmail = ${userEmail} ORDER BY created DESC`;
    return posts.rows;
  } catch (error) {
    console.error("Error fetching posts by email", error);
  }
}

export async function fetchMyLikedPosts(userEmail: string) {
  noStore();
  try {
    const likedPosts = await sql`
      SELECT * FROM posts 
      WHERE id IN (SELECT post_id FROM postlikes WHERE useremail = ${userEmail}) 
      ORDER BY created DESC`;
    return likedPosts.rows;
  } catch (error) {
    console.error("Error fetching liked posts", error);
  }
}
