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
  const [message, setMessage] = useState<string>('');
  const resetApp = () => {
    setUsername('');
    setCurrentDog(undefined);
    setSelectedDogs([]);
    setDisplayFaves(true);
    setHeroDog(undefined);
    setMessage('You have successfully logged out!');
  };

  return (
    <div>
      {message && <p className={styles.message}>{message}</p>}
      <Header username={username}
        favoritesCount={selectedDogs.length}
        setDisplayFaves={setDisplayFaves}
        resetApp={resetApp}/>
      <main>
        {!username && <SignIn setUsername={setUsername} setMessage={setMessage}/>}
        {username &&
          <div className={styles.mainContainer}>
            <Dogs setCurrentDog={setCurrentDog}
              setDisplayFaves={setDisplayFaves}
              selectedDogs={selectedDogs}
              setSelectedDogs={setSelectedDogs}/>
            <div className={styles.sideContainer}>
              {displayFaves ?
                <Favorites selectedDogs={selectedDogs}
                  setSelectedDogs={setSelectedDogs}
                  heroDog={heroDog}
                  setHeroDog={setHeroDog}
                  setCurrentDog={setCurrentDog}
                  setDisplayFaves={setDisplayFaves}/> :
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
