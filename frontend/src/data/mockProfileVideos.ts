export type Video = {
  id: string;
  title: string;
  game: string;
  views: number;
  createdAt: string;
  thumbnailUrl?: string;
};

export type ProfileVideosData = {
  yourVideos: Video[];
  taggedVideos: Video[];
  liveStreams: Video[];
};

export const mockProfileVideos: ProfileVideosData = {
  yourVideos: [
    {
      id: "v1",
      title: "Ace on Mirage",
      game: "CS2",
      views: 123,
      createdAt: "2025-01-03T18:30:00.000Z",
      thumbnailUrl: "/images/mock/videos/cs-ace.jpg",
    },
    {
      id: "v2",
      title: "Pentakill as Jinx",
      game: "League of Legends",
      views: 456,
      createdAt: "2025-01-05T21:10:00.000Z",
      thumbnailUrl: "/images/mock/videos/jinx-pentakill.jpg",
    },
  ],
  taggedVideos: [
    {
      id: "t1",
      title: "Team frag montage",
      game: "Valorant",
      views: 89,
      createdAt: "2025-01-02T20:00:00.000Z",
      thumbnailUrl: "/images/mock/videos/valorant-team.jpg",
    },
  ],
  liveStreams: [
    {
      id: "s1",
      title: "Ranked grind night",
      game: "League of Legends",
      views: 220,
      createdAt: "2025-01-07T19:00:00.000Z",
      thumbnailUrl: "/images/mock/videos/stream-thumbnail.jpg",
    },
  ],
};
