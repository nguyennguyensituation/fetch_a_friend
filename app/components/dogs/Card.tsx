import styles from './card.module.css';
import Image from 'next/image';
import { Dog } from '@/app/lib/definitions';
import { getAgeDisplay } from '@/app/utils/globalUtils';

export default function Card(props: {
  data: Dog,
  isPriority: boolean,
  handleSelect: (e: React.MouseEvent) => void,
  setCurrentDog: (dog: Dog) => void,
  setDisplayFaves: (display: boolean) => void,
  isSelected: boolean }) {
  const { age, breed, img, name, zip_code } = props.data;
  const ageDisplay = getAgeDisplay(age);
  const altTextDisplay = `${ageDisplay} ${breed} named ${name}`

  return (
    <article className={styles.card} onClick={() => {
      props.setCurrentDog(props.data);
      props.setDisplayFaves(false);
      }}>
      <figure>
          <Image src={img}
            alt={altTextDisplay}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="(max-width: 200px) 100vw, 100vw"
            priority={props.isPriority}
          />
      </figure>
      <div className={styles.detail}>
        <h4 className={styles.name}>{name}</h4>
        <button className={props.isSelected ? styles.selected : ''}
          onClick={props.handleSelect}>&#9829;</button>
        <p className={styles.breed}>{breed}</p>
        <p className={styles.age}>{ageDisplay}</p>
        <p className={styles.zip}>ZIP code: {zip_code}</p>
      </div>
    </article>
  );
}