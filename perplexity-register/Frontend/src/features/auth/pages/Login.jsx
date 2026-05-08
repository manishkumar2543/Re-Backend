import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import {useSelector} from 'react-redux'
import { Navigate } from "react-router";

const Login = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user=useSelector(state => state.auth.user);
  const loading=useSelector(state => state.auth.loading);

   const navigate=useNavigate();
   const {handleLogin}=useAuth()

  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log("Login payload:", { email, password });
    await handleLogin({email,password});
    navigate("/")
  };
  if(!loading && user){
    navigate("/");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b1020] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-8rem] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-6rem] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md items-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl"
        >
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-300">Sign in to continue your search journey.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-slate-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-[#0f172a]/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-slate-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-[#0f172a]/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Sign in
          </button>

          <p className="mt-4 text-center text-sm text-slate-300">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
