import { buttons } from "../../Styles/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Game = {
  id: number;
  name: string;
};

type Community = {
  id: number;
  name: string;
};

const featuredGames: Game[] = [
  { id: 1, name: "League of Legends" },
  { id: 2, name: "Counter-Strike 2" },
  { id: 3, name: "Valorant" },
  { id: 4, name: "World of Warcraft" },
];

const featuredCommunities: Community[] = [
  { id: 1, name: "CS Community" },
  { id: 2, name: "League of Legends Community" },
];

export const ProfileGames = () => {
  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Featured Games</h2>
          <button className={buttons}>Add game</button>
        </div>

        {featuredGames.map((game) => (
          <Card
            key={game.id}
            className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none"
          >
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </section>

      <section className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <h2>Featured Communities</h2>
          <button className={buttons}>Add community</button>
        </div>

        {featuredCommunities.map((community) => (
          <Card
            key={community.id}
            className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none"
          >
            <CardHeader>
              <CardTitle>{community.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </section>
    </>
  );
};
