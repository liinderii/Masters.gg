export type Post = {
  id: string;

  title: string;

  text?: string;

  media?: {
    type: "image" | "video";
    src: string;
  };

  author?: {
    id?: string;
    name: string;
    avatarSrc?: string;
  };
  createdAt?: string;

  caption?: string;
};
