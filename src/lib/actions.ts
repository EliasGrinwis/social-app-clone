"use server";

import {Post} from "./definitions";
import {sql} from "@vercel/postgres";

export async function createPost(post: Post) {
  const {
    title,
    description,
    likes,
    image,
    created,
    updated,
    username,
    userimage,
    useremail,
  } = post;
  const result = await sql`
      INSERT INTO posts (title, description, likes, image, created, updated, username, userimage, useremail) 
      VALUES (${title}, ${description}, ${likes}, ${image}, ${created}, ${updated}, ${username}, ${userimage}, ${useremail}) 
      RETURNING *`;
  return result.rows[0];
}

// Function to create a like for a post
export async function createLikePost(
  postId: string,
  userName: string,
  userImage: string,
  userEmail: string
) {
  try {
    console.log(
      "Creating like for post:",
      postId,
      userName,
      userImage,
      userEmail
    );
    const likeResult = await sql`
      INSERT INTO postLikes (post_id, username, userimage, useremail) 
      VALUES (${postId}, ${userName}, ${userImage}, ${userEmail}) 
      ON CONFLICT (post_id, userEmail) DO NOTHING
      RETURNING *`;

    if (likeResult.rows.length > 0) {
      await incrementPostLikes(postId);
    }

    return likeResult.rows[0];
  } catch (error) {
    console.error("Error liking post:", error);
    throw error; // Re-throw the error to handle it at a higher level
  }
}

// Function to increment the like count of a post
export async function incrementPostLikes(postId: string) {
  try {
    const result = await sql`
      UPDATE posts 
      SET likes = likes + 1 
      WHERE id = ${postId} 
      RETURNING *`;
    return result.rows[0];
  } catch (error) {
    console.error("Error incrementing post likes:", error);
    throw error; // Re-throw the error to handle it at a higher level
  }
}
