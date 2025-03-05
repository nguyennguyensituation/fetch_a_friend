"use client"
import { Dog } from '@/app/lib/definitions';
import Header from "@/app/components/header/Header";
import SignIn from "./components/sign-in/Sign-in";
import Dogs from './components/dogs/Dogs';
import Favorites from './components/favorites/Favorites';
import Profile from './components/profile/Profile';
import styles from './page.module.css';

import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState<string>('');
  const [currentDog, setCurrentDog] = useState<Dog>();
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [displayFaves, setDisplayFaves] = useState<boolean>(false);
  const [heroDog, setHeroDog] = useState<Dog>();

  return (
    <div>
      <Header username={username}
        favoritesCount={favorites.length}
        setDisplayFaves={setDisplayFaves}/>
      <main>
        {!username && <SignIn setUsername={setUsername}/>}
        {username && <div className={styles.mainContainer}>
          <Dogs setCurrentDog={setCurrentDog}
            setDisplayFaves={setDisplayFaves}/>
          <div>
          {displayFaves ?
            <Favorites favorites={favorites}
              setFavorites={setFavorites}
              heroDog={heroDog}
              setHeroDog={setHeroDog}/> :
            <Profile currentDog={currentDog}
            favorites={favorites}
            setFavorites={setFavorites}/>
          }
          </div>
        </div>}
      </main>
    </div>
  );
}
