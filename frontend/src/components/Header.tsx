import { Navigation } from "../navigation/Navigation";

export const Header = () => {
  return (
    <nav className="border-b p-3 flex items-center gap-6">
      <h1 className="text-xl font-semibold">Masters.gg</h1>
      <Navigation />
    </nav>
  );
};
