import styles from './profile.module.css';
import Image from 'next/image';

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export default function Profile(props: {
  data: Dog,
}) {
  const { age, breed, img, name, zip_code, id} = props.data;
  const ageDisplay = `${age} years old`
  const altTextDisplay = `${breed} dog`

  return (
    <article className={styles.profile}>
      <figure>
        <Image
        src={img}
        alt={altTextDisplay}
        width={200}
        height={200}
        />
        <figcaption>{name}</figcaption>
      </figure>
      <p>{breed}</p>
      <p>{ageDisplay}</p>
      <p>ZIP code: {zip_code}</p>
    </article>
  );
}