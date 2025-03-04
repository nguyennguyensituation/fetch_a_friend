import styles from './card.module.css';
import Image from 'next/image';
import { Dog } from '@/app/lib/definitions';
import { getAgeDisplay } from '@/app/utils/globalUtils';

export default function Card(props: {
  data: Dog,
  isPriority: boolean,
  setCurrentDog: (dog: Dog) => void
}) {
  const { age, breed, img, name, zip_code } = props.data;
  const ageDisplay = getAgeDisplay(age);
  const altTextDisplay = `${ageDisplay} ${breed} named ${name}`

  return (
    <article className={styles.card} onClick={() => props.setCurrentDog(props.data)}>
      <figure>
        <div className={styles.imgContainer}>
          <Image src={img}
            alt={altTextDisplay}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="(max-width: 200px) 100vw, 100vw"
            priority={props.isPriority}
          />
        </div>
      </figure>
      <div className={styles.info}>
        <h4 className={styles.name}>{name}</h4>
        <p>{breed}</p>
        <p>{ageDisplay}</p>
        <p>ZIP code: {zip_code}</p>
      </div>
    </article>
  );
}