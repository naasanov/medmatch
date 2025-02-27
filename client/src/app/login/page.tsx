"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  const inputStyle = "py-2 pl-4 w-full border-2 border-[#a8a8a8] rounded-2xl";
  return (
    <>
      {success ? (
        <div>
          <h1>You are logged in!</h1>
          <Link href="/profile">go to profile</Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen w-1/4 mx-auto">
          <p>{errMsg}</p>
          <div>
            <p className="text-7xl font-semibold mb-3">Login to </p>
            <p className="text-7xl font-semibold mb-3">Medmatch </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 w-full"
          >
            {/* Placeholder for google and linkedin logins */}
            <input
              className={inputStyle}
              type="text"
              placeholder="Login with Google"
            />
            <input
              className={inputStyle}
              type="text"
              placeholder="Login with Linkedin"
            />

            {/* should be corrected to conventions for username */}
            {/* <label htmlFor='email'>Email:</label> */}
            <input
              className={inputStyle}
              type="text"
              id="email"
              placeholder="Username"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            {/* <label htmlFor='password'>Password:</label> */}
            <input
              className={inputStyle}
              type="password"
              id="password"
              placeholder="Enter email"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <br />

            <button>Sign In</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
