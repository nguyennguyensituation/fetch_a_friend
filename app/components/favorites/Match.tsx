import { Dog } from '@/app/lib/definitions';
import styles from './match.module.css';
import { getMatch } from '@/app/utils/matchUtils';
import Image from 'next/image';
import { getAgeDisplay, getArticle } from '@/app/utils/globalUtils';

function HeroDog(props: {
  dog: Dog }) {
  const { age, breed, img, name, zip_code } = props.dog;
  const altTextDisplay = `${getAgeDisplay(age)} ${breed} named ${name}`;
  const textDisplay1 = (() => {
    return age === 0 ? 
      `${name} is ${getArticle(breed)} ${breed} puppy.` :
      `${name} is ${getArticle(age.toString())} ${age} year old ${breed}.`
  })()
  const textDisplay2 = `This dog is located in ZIP code ${zip_code}.`;
  return (
    <article className={styles.hero}>
      <figure>
        <Image src={img}
          alt={altTextDisplay}
          width={200}
          height={200}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="(max-width: 100px) 100vw, 100vw"/>
      </figure>
      <div className={styles.details}>
        <h3>You matched with {name}!</h3>
        <p>{textDisplay1}</p>
        <p>{textDisplay2}</p>
      </div> 
  </article>
  );
}

export default function Match(props: {
  favorites: Dog[],
  heroDog?: Dog,
  setHeroDog: (dog: Dog) => void }) {
  const isEmpty = props.favorites.length === 0;

  return (
    <div className={styles.matchContainer}>
      <p>Once you&apos;ve finished selecting your favorite dogs, you can get matched with a new four-legged friend.</p>
      <button disabled={isEmpty} onClick={(e: React.MouseEvent) => {
       getMatch(e, props.favorites, props.setHeroDog); 
      }}>
        Find my match!
      </button>
      {props.heroDog && <HeroDog dog={props.heroDog}/>
  }
    </div>
  );
}
