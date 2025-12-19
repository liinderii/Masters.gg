import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProfilePage } from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div style={{ padding: 24 }}>Något gick fel.</div>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "profile", element: <ProfilePage /> },

      { path: "*", element: <div>404</div> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);
