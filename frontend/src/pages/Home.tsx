import { SidebarProvider } from "../components/ui/sidebar";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { MainCarousel } from "../components/Carousel";
import { Input } from "../components/ui/input";
import { PostGrid } from "../components/PostGrid";

export function HomePage() {
  return (
    <SidebarProvider>
      <div className="flex w-full items-start">
        {/* Left sidebar */}
        <aside className="w-80 shrink-0 sticky top-0 h-dvh">
          <div className="h-full overflow-y-auto p-10">
            <LeftSidebar />
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 p-6 flex justify-center">
          <div className="w-full max-w-5xl">
            <Input placeholder="Whats on your mind?" className="mb-6 w-full" />
            <MainCarousel />
            <PostGrid />
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
  );
}
