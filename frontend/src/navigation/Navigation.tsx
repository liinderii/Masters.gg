import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className="flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};
