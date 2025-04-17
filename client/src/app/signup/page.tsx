"use client";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// zod defines form shape and fields
const formSchema = z.object({
  first: z.string().min(1).max(50),
  last: z.string().min(1).max(50),
  phone: z.string(), // figure out phone number validation - might be a different library than zod
  birthday: z.string().date(),
  email: z.string().email(),
  password: z.string().min(8)
})

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first: "",
      last: "",
      phone: "",
      birthday: "",
      email: "",
      password: "",
    },
    
  })
 
  // submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="first"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="birthday mm/dd/yyyy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="phone number (xxx) xxx-xxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password "placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  )
}

/*
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
*/