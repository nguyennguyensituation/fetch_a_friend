import styles from '../favorites/favorites.module.css';
import { Dog } from '@/app/lib/definitions';
import Image from 'next/image';
import { getAgeDisplay } from '@/app/utils/globalUtils';

function removeFromFavorites(e: React.MouseEvent,
  id: string,
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void) {
  e.preventDefault();

  const updatedFaves = favorites.filter(dog => dog.id !== id);
  setFavorites(updatedFaves);
}

function Item(props: {
  dog: Dog,
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void }) {
    const { age, breed, img, name, id, zip_code } = props.dog;
    const ageDisplay = getAgeDisplay(age);
    const altTextDisplay = `${ageDisplay} ${breed} named ${name}`;

    return (
      <article className={styles.item}>
        <figure>
          <Image src={img}
          alt={altTextDisplay}
          width={100}
          height={100}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="(max-width: 100px) 100vw, 100vw"
          />
        </figure>
        <div className={styles.details}>
          <p>{name}</p>
          <p>{breed}</p>
          <p>{ageDisplay}</p>
          <p>ZIP code: {zip_code}</p>
        </div>  
        <button onClick={(e: React.MouseEvent) => {
          removeFromFavorites(e, id, props.favorites, props.setFavorites);
          }}>&times;</button>
      </article>
    );
}

export default function Favorites(props: {
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void }) {
  const faves = props.favorites;
  const total = faves.length;
  const totalDisplay = total === 1 ? '1 dog' : `${total} dogs`
  const faveList = (faves.map((fave: Dog, idx: number) => {
    return <Item key={idx} dog={fave}
      favorites={props.favorites}
      setFavorites={props.setFavorites}/>;
    }));

  return (
    <section className={styles.favorites}>
      <h2>Your Favorite Dogs</h2>
      {total === 0  ? 
        <p>You haven&apos;t added any favorites yet.</p> :
        <div className={styles.faveContainer}>
          <p>Total: {totalDisplay}</p>
          {faveList}
        </div>
      }
      <div className={styles.matchContainer}>
        <p>Once you've finished selecting your favorite dogs, you can get matched with a new four-legged friend.</p>
        <button>Find my match!</button>
        </div>
    </section>
  );
}
