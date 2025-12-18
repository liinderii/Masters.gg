import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import { mockPlatforms } from "../data/mockPlatforms";

export const PlatformsCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {mockPlatforms.map((p) => (
          <CarouselItem key={p.id} className="pl-4 basis-1/2 md:basis-1/4">
            <button
              type="button"
              onClick={() => console.log("platform clicked", p.id)}
              className="w-full overflow-hidden rounded-xl border text-center"
            >
              <div className="flex h-40 items-center justify-center p-6">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-12 w-12 object-contain"
                />
              </div>

              <div className="pb-4 text-sm font-semibold">{p.name}</div>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="border-emerald-400 border-2" />
      <CarouselNext className="border-emerald-400 border-2" />
    </Carousel>
  );
};
