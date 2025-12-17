import { Navigation } from "../navigation/Navigation";
import { Dice6 } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="grid grid-cols-3 items-center px-10 py-10">
        <div className="justify-self-start">
          <Dice6 className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-semibold text-center">Masters.gg</h1>

        <div className="flex justify-end">
          <Navigation />
        </div>
      </nav>
    </header>
  );
};
