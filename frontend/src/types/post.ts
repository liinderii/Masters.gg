export type PostAttachment = {
  kind: "photo" | "video";
  refId: string;
};

export type Post = {
  _id: string;
  userId: string;

  userDisplayName?: string;

  content: string;
  attachments?: PostAttachment[];
  createdAt: string;
};
