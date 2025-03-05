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
  const [selectedDogs, setSelectedDogs] = useState<Dog[]>([]);
  const [displayFaves, setDisplayFaves] = useState<boolean>(true);
  const [heroDog, setHeroDog] = useState<Dog>();

  return (
    <div>
      <Header username={username}
        favoritesCount={selectedDogs.length}
        setDisplayFaves={setDisplayFaves}/>
      <main>
        {!username && <SignIn setUsername={setUsername}/>}
        {username && <div className={styles.mainContainer}>
          <Dogs setCurrentDog={setCurrentDog}
            setDisplayFaves={setDisplayFaves}
            selectedDogs={selectedDogs}
            setSelectedDogs={setSelectedDogs}/>
          <div>
          {displayFaves ?
            <Favorites selectedDogs={selectedDogs}
              setSelectedDogs={setSelectedDogs}
              heroDog={heroDog}
              setHeroDog={setHeroDog}/> :
            <Profile currentDog={currentDog}
            selectedDogs={selectedDogs}
            setSelectedDogs={setSelectedDogs}/>
          }
          </div>
        </div>}
      </main>
    </div>
  );
}
