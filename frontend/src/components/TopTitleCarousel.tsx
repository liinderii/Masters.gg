import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import { mockTopTitles } from "../data/mockTopTitles";

export const TopTitlesCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {mockTopTitles.map((t) => (
          <CarouselItem key={t.id} className="pl-4 basis-1/2 md:basis-1/4">
            <button
              type="button"
              onClick={() => console.log("title clicked", t.id)}
              className="w-full overflow-hidden rounded-xl border text-left"
            >
              <div className="relative">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-40 w-full object-cover"
                />
                <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold">
                  #{t.rank}
                </span>
              </div>

              <div className="p-3 text-sm font-semibold truncate">{t.name}</div>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="border-emerald-400 border-2" />
      <CarouselNext className="border-emerald-400 border-2" />
    </Carousel>
  );
};
