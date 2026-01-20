import { useState } from "react";
import { Navigation } from "../navigation/Navigation";
import { Dice6, Menu, X } from "lucide-react";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-900 text-white shadow-md">
      <nav className="grid grid-cols-3 items-center px-10 py-10 md:px-10 md:py-10 px-4 py-3">
        <div className="flex justify-self-start items-center gap-3 md:gap-20">
          <Dice6 className="w-8 h-8 md:w-8 md:h-8 w-7 h-7" />
        </div>

        <h1 className="text-2xl font-semibold text-center md:text-2xl text-lg">
          Masters.gg
        </h1>

        <div className="flex justify-end items-center gap-2">
          <div className="hidden md:flex">
            <Navigation />
          </div>

          <button
            type="button"
            className="md:hidden rounded-md p-2 hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="col-span-3 md:hidden mt-3 border-t border-white/10 pt-4">
            {/* 🔽 ENDA ÄNDRINGEN HÄR */}
            <div
              className="flex flex-col items-center gap-3 text-center"
              onClick={() => setOpen(false)}
            >
              <Navigation />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
