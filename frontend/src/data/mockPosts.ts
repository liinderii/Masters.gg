import type { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: "p1",
    title: "Epic clutch!",
    author: { name: "PlayerOne" },
    caption: "Epic clutch!",
    media: { type: "image", src: "/posts/post1.jpg" },
    createdAt: "2025-12-17",
  },
  {
    id: "p2",
    title: "Montage drop",
    author: { name: "GamerGirl" },
    caption: "Montage drop",
    media: {
      type: "video",
      src: "/posts/post2.mp4",
    },
    createdAt: "2025-12-17",
  },
  {
    id: "p3",
    title: "New skin look",
    author: { name: "SupportMain" },
    caption: "New skin look",
    media: { type: "image", src: "/posts/post3.jpg" },
  },
  {
    id: "p4",
    title: "Strat breakdown",
    author: { name: "IGL" },
    caption: "Strat breakdown",
    media: {
      type: "video",
      src: "/posts/post4.mp4",
    },
  },
];
