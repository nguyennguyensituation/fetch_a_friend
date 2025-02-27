"use client"

import Header from "@/app/components/header/Header";
import SignIn from "./components/sign-in/Sign-in";
import Dogs from "@/app/components/dogs/Dogs";
import Favorites from "@/app/components/favorites/Favorites";

import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState<string>('');

  return (
    <div>
      <main>
        <Header username={username}/>
        {!username && <SignIn setUsername={setUsername}/>}
        {username && <Dogs/>}
        {/* {signedIn && <Favorites />} */}
      </main>
    </div>
  );
}
