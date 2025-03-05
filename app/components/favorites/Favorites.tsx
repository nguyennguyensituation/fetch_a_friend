import { useState } from 'react';
import styles from '../favorites/favorites.module.css';
import { Dog } from '@/app/lib/definitions';
import Item from './Item';
import Match from './Match';

export default function Favorites(props: {
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void,
  heroDog?: Dog,
  setHeroDog: (dog: Dog) => void }) {
  const faves = props.favorites;
  const total = faves.length;
  const totalDisplay = total === 1 ? '1 dog' : `${total} dogs`
  const faveList = (faves.map((dog: Dog, idx: number) => {
    return <Item 
      key={idx}
      dog={dog}
      favorites={faves}
      setFavorites={props.setFavorites}/>;
    }));

  return (
    <section className={styles.favorites}>
      <h2>Your Favorite Dogs</h2>
      <div className={styles.faveContainer}>
        {total === 0 ?
          <p>You haven&apos;t added any favorites yet.</p> :
          <>
             <p>Total: {totalDisplay}</p>
             {faveList}
          </>
        }
      </div>
      <Match favorites={faves} heroDog={props.heroDog} setHeroDog={props.setHeroDog}/>
    </section>
  );
}
