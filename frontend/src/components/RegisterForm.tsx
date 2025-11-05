import axios from "axios";
import { useState } from "react";
import { type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

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
      "http://localhost:3000/register",
      {
        name: userName,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);

    location.href = "/";
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-10 max-w-sm rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-md"
      >
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Name@example.com"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 px-3 py-2
             focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
            className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 px-3 py-2
             focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 px-3 py-2
             focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={confirm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirm(e.target.value)
            }
            className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 px-3 py-2
             focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div>
          <button
            className="mt-6 w-full rounded-lg bg-violet-400 hover:bg-violet-500 text-white font-semibold py-2 transition focus:outline-none focus:ring-2 focus:ring-violet-300"
            type="submit"
          >
            Register
          </button>
          <button
            className="mt-6 w-full rounded-lg bg-violet-400 hover:bg-violet-500 text-white font-semibold py-2 transition focus:outline-none focus:ring-2 focus:ring-violet-300"
            type="button"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </>
  );
};
