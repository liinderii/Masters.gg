// src/mocks/profileFriends.ts

export type Friend = {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
};

export type FriendRequest = {
  id: string;
  name: string;
};

export type ProfileFriendsData = {
  friends: Friend[];
  requests: FriendRequest[];
};

export const mockProfileFriends: ProfileFriendsData = {
  friends: [
    { id: "1", name: "Alex", isOnline: true },
    { id: "2", name: "Jonas", isOnline: false },
    { id: "3", name: "Mia", isOnline: true },
    { id: "4", name: "Leo", isOnline: false },
  ],
  requests: [
    { id: "r1", name: "Rickard" },
    { id: "r2", name: "Sara" },
  ],
};
