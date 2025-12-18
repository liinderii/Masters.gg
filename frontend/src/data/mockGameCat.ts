import type { GameCategory } from "../types/GameCategory";

export const mockGameCategories: GameCategory[] = [
  { id: "fps", name: "FPS", image: "/categories/fps.jpg" },
  { id: "moba", name: "MOBA", image: "/categories/moba.jpg" },
  { id: "rpg", name: "RPG", image: "/categories/rpg.jpg" },
  { id: "indie", name: "Indie", image: "/categories/indie.jpg" },
  { id: "strategy", name: "Strategy", image: "/categories/strategy.jpg" },
  { id: "sports", name: "Sports", image: "/categories/sports.jpg" },
  { id: "racing", name: "Racing", image: "/categories/racing.jpg" },
  {
    id: "battle-royale",
    name: "Battle Royale",
    image: "/categories/battle-royale.jpg",
  },
];
