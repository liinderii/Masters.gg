import { Navigation } from "../navigation/Navigation";
import { Dice6 } from "lucide-react";
import { Input } from "./ui/input";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-zinc-900 text-white shadow-md">
      <nav className="grid grid-cols-3 items-center px-10 py-10">
        <div className=" flex justify-self-start flex-row gap-20">
          <Dice6 className="w-8 h-8" />
          <Input placeholder="Search..." className="ml-2 w-80" />
        </div>

        <h1 className="text-2xl font-semibold text-center">Masters.gg</h1>

        <div className="flex justify-end">
          <Navigation />
        </div>
      </nav>
    </header>
  );
};
