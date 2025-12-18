import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header – sticky */}
      <header className="sticky top-0 z-50">
        <Header />
      </header>

      {/* Main – tar all plats */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer – INTE sticky */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
