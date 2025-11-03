import axios from "axios";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/login",
      {
        email: userName,
        password: password,
      },
      { withCredentials: true }
    );

    console.log(response.data);
    location.href = "/";
  };

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <video
        className="absolute inset-0 -z-10 w-full h-full object-cover"
        src="/Login.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <form
        onSubmit={onSubmit}
        className="
          relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl
          rounded-2xl border border-white/10
          bg-white/10 backdrop-blur-md
          p-6 shadow-xl
        "
      >
        <h2 className="text-3xl font-bold text-center text-violet-400 mb-8">
          Login
        </h2>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-white/80 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="username"
            value={userName}
            onChange={onChangeUserName}
            className="
              block w-full rounded-lg
              border border-white/20
              bg-white/10 text-white placeholder-white/60
              px-3 py-2 outline-none
              focus:ring-2 focus:ring-violet-400 focus:border-violet-400
            "
            placeholder="you@domain.com"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white/80 mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            className="
              block w-full rounded-lg
              border border-white/20
              bg-white/10 text-white placeholder-white/60
              px-3 py-2 outline-none
              focus:ring-2 focus:ring-violet-400 focus:border-violet-400
            "
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-violet-400 hover:bg-violet-500 text-white font-semibold py-2 transition focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="mt-3 w-full rounded-lg bg-violet-400 hover:bg-violet-500 text-white font-semibold py-2 transition focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          Create new account
        </button>
      </form>
    </div>
  );
};
