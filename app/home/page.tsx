"use client"
import Header from "@/app/components/header/Header";
import Dogs from '@/app/components/dogs/Dogs';

export default function Page(props: {

}) {
  return (
    <>
      <Header username="TK"/>
      <main>
        <Dogs />
      </main>
    </>
  );  
}