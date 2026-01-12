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
    <>
      <h1>We belive you would like these Platforms</h1>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {mockPlatforms.map((p) => (
            <CarouselItem key={p.id} className="pl-4 basis-1/2 md:basis-1/4">
              <button
                type="button"
                onClick={() => console.log("platform clicked", p.id)}
                className="w-full overflow-hidden rounded-xl border text-center"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-40 w-full object-cover"
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
    </>
  );
};
