"use client"

import Header from "@/app/components/header/Header";
import SignIn from "./components/sign-in/Sign-in";
import Dogs from './components/dogs/Dogs';
import Favorites from './components/favorites/Favorites';
import styles from './page.module.css';

import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState<string>('');

  return (
    <div>
      <Header username={username}/>
      <main>
        {!username && <SignIn setUsername={setUsername}/>}
        {username && <div className={styles.mainContainer}>
          <Dogs />
          <Favorites />
        </div>}
      </main>
    </div>
  );
}
