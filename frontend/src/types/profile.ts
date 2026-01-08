export type ProfileMe = {
  userId: string;
  bio: string;
  intro: {
    livesIn: string;
    from: string;
    relationshipStatus: string;
  };
  avatarPhotoId: string;
  coverPhotoId: string;
  updatedAt?: string;
};
