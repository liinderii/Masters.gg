import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import { mockStories } from "../data/mockStories";

export const MainCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {mockStories.map((post) => (
          <CarouselItem key={post.id} className="pl-4 basis-1/2 md:basis-1/4">
            <button
              type="button"
              onClick={() => console.log("clicked", post.id)}
              className="w-full overflow-hidden rounded-xl border"
            >
              {post.type === "image" ? (
                <img
                  src={post.src}
                  alt={post.title ?? "Story"}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <video
                  src={post.src}
                  className="h-40 w-full object-cover"
                  muted
                  playsInline
                />
              )}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="border-emerald-400 border-2" />
      <CarouselNext className="border-emerald-400 border-2" />
    </Carousel>
  );
};
