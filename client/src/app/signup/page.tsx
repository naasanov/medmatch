"use client";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

function Signup() {
  const firstRef = useRef<HTMLInputElement>(null);

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstRef?.current?.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [first, last, email, password])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      {success ? (
        <div>
          <h1>You have signed up!</h1>
          <p>Continue to <Link href='/profile'> profile</Link></p>
        </div>
      ) : (
        <div>
          <p>{errMsg}</p>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='first'>First Name:</label>
            <input type='text' id='first' ref={firstRef} onChange={e => setFirst(e.target.value)} value={first} required />

            <label htmlFor='last'>Last Name:</label>
            <input type='text' id='last' onChange={e => setLast(e.target.value)} value={last} required />
            <br />

            <label htmlFor='email'>Email:</label>
            <input type='text' id='email' onChange={e => setEmail(e.target.value)} value={email} required />
            <br />

            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' onChange={e => setPassword(e.target.value)} value={password} required />
            <br />

            <button>Sign In</button>
          </form>
        </div>
      )
      }
    </>
  );
}

export default Signup;