import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-50">
        <Header />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
