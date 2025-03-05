import { Dog } from '@/app/lib/definitions';
import { getAgeDisplay } from '@/app/utils/globalUtils';
import styles from './item.module.css';
import Image from 'next/image';
import { removeFromFavorites } from '@/app/utils/favoritesUtils';

export default function Item(props: {
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
            sizes="(max-width: 100px) 100vw, 100vw"/>
        </figure>
        <div className={styles.details}>
          <p>{name}</p>
          <p>{breed}</p>
          <p>{ageDisplay}</p>
          <p>ZIP code: {zip_code}</p>
        </div>  
        <button onClick={(e: React.MouseEvent) => {
          removeFromFavorites(e, id, props.favorites, props.setFavorites);
          }}>
          &times;
        </button>
      </article>
    );
}
