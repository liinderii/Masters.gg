// src/mocks/profilePhotos.ts

export type Photo = {
  id: string;
  url: string;
  caption?: string;
  createdAt: string;
};

export type Album = {
  id: string;
  title: string;
  photos: number;
};

export type ProfilePhotosData = {
  taggedPhotos: Photo[];
  yourPhotos: Photo[];
  albums: Album[];
};

export const mockProfilePhotos: ProfilePhotosData = {
  taggedPhotos: [
    {
      id: "t1",
      url: "/images/mock/cs-lan.jpg",
      caption: "LAN night!",
      createdAt: "2025-01-01T21:00:00.000Z",
    },
  ],
  yourPhotos: [
    {
      id: "p1",
      url: "/images/mock/pc-setup.jpg",
      caption: "My gaming setup",
      createdAt: "2025-01-03T15:10:00.000Z",
    },
  ],
  albums: [
    {
      id: "a1",
      title: "LAN Events 2024",
      photos: 12,
    },
    {
      id: "a2",
      title: "Gaming Memes",
      photos: 5,
    },
  ],
};
