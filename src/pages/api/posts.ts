import {NextApiRequest, NextApiResponse} from "next";
import {fetchPostsByUserEmail} from "@/lib/data"; // Adjust the import path as per your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userEmail = req.query.email as string; // Assuming you pass email as query param or in req.body

    try {
      const posts = await fetchPostsByUserEmail(userEmail); // Fetch posts using your database logic
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching user posts", error);
      res.status(500).json({message: "Failed to fetch user posts"});
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({message: `Method ${req.method} not allowed`});
  }
}
