export type TypeMessage = {
  type: "success" | "error" | "warning";
  message: string;
  setMessage: (message: string) => void;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  likes: number;
  image: string;
  created: string;
  updated: string;
  username: string;
  userimage: string;
  useremail: string;
  postlikes: PostLike[];
};

export type PostLike = {
  id: string;
  post_id: string;
  username: string;
  userimage: string;
  useremail: string;
  liked_at: string;
};
