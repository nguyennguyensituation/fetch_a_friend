import { Dog } from '@/app/lib/definitions';
import Image from 'next/image';
import styles from './profile.module.css';
import { getAgeDisplay } from '@/app/utils/globalUtils';

function toggleFavorite(dog: Dog,
  favorites: Dog[],
  setFavorites: (dogs: Dog[]) => void): void {
  
  if (alreadySelected(dog.id, favorites)) {
    const updatedFaves = favorites.filter(fave => fave.id !== dog.id);
    setFavorites(updatedFaves)
  } else {
    setFavorites([...favorites, dog]);
  }
}

function alreadySelected(id: string,
  favorites: Dog[]
) {
  return favorites.some((fave: Dog) => fave.id === id);
}

export default function Profile(props: {
  currentDog?: Dog,
  favorites: Dog[],
  setFavorites: (dogs: Dog[]) => void
}) {
  if (props.currentDog) {
    const { favorites, setFavorites, currentDog } = props;
    const { id, img, name, age, zip_code, breed } = currentDog;
    const ageDisplay = getAgeDisplay(age);
    const altTextDisplay = `${ageDisplay} ${breed} named ${name}`;
    const isSelected = alreadySelected(id, favorites);
    const buttonText = isSelected ?
      <span className={styles.selected}>&#9829; Saved</span> :
      <span>&#9829; Save</span>

    return (
      <article className={styles.profile}>
        <div className={styles.details}>
          <h2 className={styles.name}>{name}</h2>
          <button className={styles.btn}
            onClick={(e) => {
              e.preventDefault();
              if (currentDog) toggleFavorite(currentDog, favorites, setFavorites);
            }}>
              {buttonText}
          </button>
          <p className={styles.breed}>Breed: {breed}</p>
          <p className={styles.age}>Age: {ageDisplay}</p>
          <p className={styles.zip}>ZIP code: {zip_code}</p>
        </div>
        <figure>
            <Image src={img}
              alt={altTextDisplay}
              width={400}
              height={400}
            />
        </figure>
      </article>
    );
  } else {
    return (
      <article className={styles.profile}>
      </article>
    );
  }
  
}