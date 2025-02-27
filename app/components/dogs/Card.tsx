import styles from './card.module.css';
import Image from 'next/image';

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

function getAgeDisplayText(age: number): string {
  if (age < 1) {
    return "Under a year old"
  } else if (age === 1) {
    return "1 year old"
  } else {
    return `${age} years old`
  }
}
export default function Card(props: {
  data: Dog,
  isPriority: boolean
}) {
  const { age, breed, img, name, zip_code } = props.data;
  const ageDisplay = getAgeDisplayText(age);
  const altTextDisplay = `${ageDisplay} ${breed} dog named ${name}`

  return (
    <article className={styles.card}>
      <h4 className={styles.dogName}>{name}</h4>
      <figure>
        <div className={styles.imgContainer}>
          <Image
          src={img}
          alt={altTextDisplay}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="(max-width: 300px) 100vw, 100vw"
          priority={props.isPriority}
          />
        </div>
      </figure>
      <div className={styles.caption}>
        <p>{breed}</p>
        <p>{ageDisplay}</p>
        <p>ZIP code: {zip_code}</p>
      </div>
    </article>
  );
}