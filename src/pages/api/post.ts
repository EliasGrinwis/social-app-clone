import {NextApiRequest, NextApiResponse} from "next";
import {fetchPostById, fetchPostsByUserEmail} from "@/lib/data"; // Adjust the import path as per your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const postId = req.query.id as string; // Assuming you pass email as query param or in req.body

    try {
      const post = await fetchPostById(postId); // Fetch posts using your database logic
      res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching post", error);
      res.status(500).json({message: "Failed to fetch post"});
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({message: `Method ${req.method} not allowed`});
  }
}
