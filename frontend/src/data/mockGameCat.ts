import type { GameCategory } from "../types/GameCategory";

export const mockGameCategories: GameCategory[] = [
  { id: "fps", name: "FPS", image: "/categories/FPS1.jpg" },
  { id: "moba", name: "MOBA", image: "/categories/INDI.1.webp" },
  { id: "rpg", name: "RPG", image: "/categories/MOBA1.jpg" },
  { id: "indie", name: "Indie", image: "/categories/RPG1.jpg" },
  { id: "strategy", name: "Strategy", image: "/categories/strategy.jpg" },
  { id: "sports", name: "Sports", image: "/categories/sports.jpg" },
  { id: "racing", name: "Racing", image: "/categories/racing.jpg" },
  {
    id: "battle-royale",
    name: "Battle Royale",
    image: "/categories/battle-royale.jpg",
  },
];
