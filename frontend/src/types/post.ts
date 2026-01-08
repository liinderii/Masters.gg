export type PostAttachment = {
  kind: "photo" | "video";
  refId: string;
};

export type Post = {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
  attachments?: PostAttachment[];
};
