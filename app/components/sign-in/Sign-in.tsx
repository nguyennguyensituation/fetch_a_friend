'use client';

import { useState } from 'react';
import styles from "../sign-in/sign-in.module.css";
import { redirect } from 'next/dist/server/api-utils';

export default function SignIn(props: {
  setUsername: (name: string) => void
}) {  
  const [message, setMessage] = useState('');
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData(event.target as HTMLFormElement);
    const url = "https://frontend-take-home-service.fetch.com/auth/login";
    const name = formData.get('name');
    const email = formData.get('email');
    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email })
    });
  
    const response = await fetch(request);
    
    if (response.ok) {
      props.setUsername(name as string);
    } else {
      setMessage('There was an error signing in. Please try again.')
      throw new Error("There was an error signing in");
    } 
  }

  return (
    <form className={styles.login} onSubmit={handleSignIn}>
      <h2>Sign in to get started</h2>
      <fieldset>
        <label htmlFor="name">Username</label>
        <input id="name"
          type="text"
          name="name"
          placeholder="Enter your username (up to 30 characters max)"
          required />
      </fieldset>
      
      <fieldset>
        <label htmlFor="email">Email</label>
        <input id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required />
      </fieldset>
      {message && <p className={styles.error}>{message}</p>}
      <button type="submit">Sign in</button>
    </form>
  );
}