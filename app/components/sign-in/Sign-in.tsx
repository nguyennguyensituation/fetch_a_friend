'use client';

import { useState } from 'react';
import styles from "../sign-in/sign-in.module.css";
import { handleSignIn } from '@/app/utils/signInUtils';

export default function SignIn(props: {
  setUsername: (name: string) => void
}) {  
  const [message, setMessage] = useState('');

  return (
    <form className={styles.login} onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
      handleSignIn(e, props.setUsername, setMessage);
    }}>
      <h2>Sign in to get started</h2>

      <fieldset>
        <label htmlFor="name">Username</label>
        <input id="name"
          type="text"
          name="name"
          placeholder="Enter your username"
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