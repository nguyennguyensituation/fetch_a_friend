import { Dog } from '@/app/lib/definitions';
import Image from 'next/image';
import styles from './profile.module.css';

export default function Profile(props: {
  currentDog: Dog
}) {
  const { id, img, name, age, zip_code, breed } = props.currentDog;
  return (
    <article className={styles.profile}>
      <figure>
          <Image src={img}
            alt="TK"
            width={350}
            height={350}
            style={{width: 'auto'}}
          />
      </figure>
      <div className={styles.details}>
        <h3>{name}</h3>
        <p>{breed}</p>
        <p>{age}</p>
        <p>ZIP code: {zip_code}</p>
      </div>
      
    </article>
  );
}