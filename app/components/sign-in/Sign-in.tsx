'use client';

import { useState } from 'react';
import styles from "../sign-in/sign-in.module.css";
import { handleSignIn } from '@/app/utils/signInUtils';

export default function SignIn(props: {
  setUsername: (name: string) => void,
  setMessage: (message: string) => void }) {  
  const [error, setError] = useState('');

  return (
    <form className={styles.login} onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
      handleSignIn(e, props.setUsername, setError, props.setMessage);
    }}>
      <h2>Sign in to get started</h2>

      <fieldset>
        <label htmlFor="name">Username</label>
        <input id="name"
          type="text"
          name="name"
          maxLength={30}
          placeholder="Enter your username (up to 30 characters)"
          required />
      </fieldset>
      
      <fieldset>
        <label htmlFor="email">Email</label>
        <input id="email"
          type="email"
          name="email"
          maxLength={320}
          placeholder="Enter your email address"
          required />
      </fieldset>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">Sign in</button>
    </form>
  );
}