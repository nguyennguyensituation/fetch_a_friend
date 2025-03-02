"use client"

import Header from "@/app/components/header/Header";
import SignIn from "./components/sign-in/Sign-in";
import Dogs from './components/dogs/Dogs';

import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState<string>('');

  return (
    <div>
      <Header username={username}/>
      <main>
        {!username && <SignIn setUsername={setUsername}/>}
        {username && <Dogs />}
      </main>
    </div>
  );
}
