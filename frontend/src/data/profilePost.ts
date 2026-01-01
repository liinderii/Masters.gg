export type Post = {
  id: string;
  type: "text" | "photo" | "video";
  content: string;
  createdAt: string;
};

export type ProfilePostsData = {
  bio?: string | null;
  livesIn?: string | null;
  from?: string | null;
  displayName?: string | null;
  posts: Post[];
};

export const mockProfilePosts: ProfilePostsData = {
  bio: "Full-stack developer and gamer.",
  livesIn: "Stockholm",
  from: "Nacka",
  displayName: "Marcus",
  posts: [
    {
      id: "1",
      type: "text",
      content: "First post on my new profile!",
      createdAt: "2025-01-01T10:00:00.000Z",
    },
    {
      id: "2",
      type: "photo",
      content: "Uploaded a photo from LAN-night yesterday.",
      createdAt: "2025-01-02T18:30:00.000Z",
    },
  ],
};
