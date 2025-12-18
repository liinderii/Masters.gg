import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import { mockGameCategories } from "../data/mockGameCat";

export const GameCategoriesCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {mockGameCategories.map((cat) => (
          <CarouselItem key={cat.id} className="pl-4 basis-1/2 md:basis-1/4">
            <button
              type="button"
              onClick={() => console.log("category clicked", cat.id)}
              className="w-full overflow-hidden rounded-xl border text-left"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-3 text-sm font-semibold">{cat.name}</div>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="border-emerald-400 border-2" />
      <CarouselNext className="border-emerald-400 border-2" />
    </Carousel>
  );
};
