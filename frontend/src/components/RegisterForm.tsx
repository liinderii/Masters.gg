import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    const response = await axios.post(
      `${API_BASE}/register`,
      {
        name: userName,
        email,
        password,
      },
      { withCredentials: true }
    );

    console.log(response.data);
    location.href = "/";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background video */}
      <video
        className="absolute inset-0 -z-10 w-full h-full object-cover"
        src="/Login.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay */}
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
          Create account
        </h2>

        {error && (
          <p className="mb-4 text-center text-sm text-red-400">{error}</p>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="you@domain.com"
            className="
              block w-full rounded-lg
              border border-white/20
              bg-white/10 text-white placeholder-white/60
              px-3 py-2 outline-none
              focus:ring-2 focus:ring-violet-400 focus:border-violet-400
            "
          />
        </div>

        {/* Username */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-white/80 mb-1">
            Username:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
            className="
              block w-full rounded-lg
              border border-white/20
              bg-white/10 text-white placeholder-white/60
              px-3 py-2 outline-none
              focus:ring-2 focus:ring-violet-400 focus:border-violet-400
            "
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-white/80 mb-1">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="••••••••"
            className="
              block w-full rounded-lg
              border border-white/20
              bg-white/10 text-white placeholder-white/60
              px-3 py-2 outline-none
              focus:ring-2 focus:ring-violet-400 focus:border-violet-400
            "
          />
        </div>

        {/* Confirm */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-white/80 mb-1">
            Confirm password:
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirm(e.target.value)
            }
            placeholder="••••••••"
            className="
              block w-full rounded-lg
              border border-white/20
              bg-white/10 text-white placeholder-white/60
              px-3 py-2 outline-none
              focus:ring-2 focus:ring-violet-400 focus:border-violet-400
            "
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-violet-400 hover:bg-violet-500 text-white font-semibold py-2 transition focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-3 w-full rounded-lg bg-violet-400 hover:bg-violet-500 text-white font-semibold py-2 transition focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          Already have an account?
        </button>
      </form>
    </div>
  );
};
