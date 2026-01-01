// src/mocks/profileAbout.ts

export type AboutSection = {
  id: string;
  title: string;
  content?: string[]; // text, info, list items
};

export type ProfileAboutData = {
  sections: AboutSection[];
};

export const mockProfileAbout: ProfileAboutData = {
  sections: [
    {
      id: "1",
      title: "About",
      content: ["Full-stack developer", "Gaming since 2005"],
    },
    { id: "2", title: "Friends", content: ["42 friends", "3 mutual"] },
    {
      id: "3",
      title: "Games",
      content: ["Counter-Strike 2", "League of Legends", "Valorant"],
    },
    { id: "4", title: "Photos", content: ["8 uploaded photos"] },
    { id: "5", title: "Videos", content: ["2 videos posted"] },
    { id: "6", title: "Music", content: ["Favorite genre: Synthwave"] },
    { id: "7", title: "Likes", content: ["Anime", "Coding", "LAN events"] },
    {
      id: "8",
      title: "Events",
      content: ["DreamHack Winter", "LAN-Night Stockholm"],
    },
  ],
};
