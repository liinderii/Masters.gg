import { buttons } from "../Styles/button";
import { Card, CardContent } from "./ui/card";

export const Lfg = () => {
  return (
    <Card
      className="w-full h-80 flex items-center justify-center p-8
    bg-neutral-800
    rounded-xl
    border-l-2
    border-t-2
    border-slate-400/60
    shadow-[0_0_20px_rgba(16,185,129,0.25)]"
    >
      <CardContent className="">
        <h2 className="text-xl font-semibold">
          Join the battle and play together
        </h2>
        <div className="flex gap-4 mt-4">
          <button type="button" className={buttons}>
            Looking for more
          </button>
          <button type="button" className={buttons}>
            Looking for more
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
