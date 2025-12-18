import { SidebarProvider } from "../components/ui/sidebar";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { MainCarousel } from "../components/Carousel";
import { Input } from "../components/ui/input";
import { PostGrid } from "../components/PostGrid";
import { PlatformsCarousel } from "../components/PlatformsCarousel";
import { TopTitlesCarousel } from "../components/TopTitleCarousel";
import { GameCategoriesCarousel } from "../components/CategoriesCarousel";
import { Lfg } from "../components/Lfg";
import { HeroSection } from "../components/HeroSection";

export function HomePage() {
  return (
    <>
      <HeroSection />

      <SidebarProvider>
        <div
          className="flex w-full items-start bg-zinc-900 text-white
"
        >
          {/* Left sidebar */}
          <aside className="w-80 shrink-0 sticky top-0 h-dvh">
            <div className="h-full overflow-y-auto p-10">
              <LeftSidebar />
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0 flex-1 p-6 flex justify-center">
            <div className="w-full max-w-5xl">
              <Input
                placeholder="Whats on your mind?"
                className="mb-6 mt-12 w-full"
              />

              <section className="space-y-6 p-6">
                <MainCarousel />
              </section>
              <section className="space-y-8 p-6">
                <PostGrid />
              </section>

              <section className="flex flex-col gap-12 p-6">
                <GameCategoriesCarousel />
                <TopTitlesCarousel />
                <PlatformsCarousel />
              </section>

              <section
                className="space-y-8 p-6 



"
              >
                <Lfg />
              </section>
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="w-80 shrink-0 sticky top-0 h-dvh">
            <div className="h-full overflow-y-auto p-10">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </SidebarProvider>
    </>
  );
}
