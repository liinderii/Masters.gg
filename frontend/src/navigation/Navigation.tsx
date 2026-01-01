import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import { User } from "lucide-react";

export const Navigation = () => {
  return (
    <>
      <div className="flex gap-10">
        <Crown />
        <Link
          to="/profile"
          className=" rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <User />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
};
