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
          width={150}
          height={150}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
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
  selectedDogs: Dog[],
  heroDog?: Dog,
  setHeroDog: (dog: Dog) => void }) {
  const isEmpty = props.selectedDogs.length === 0;

  return (
    <div className={styles.matchContainer}>
      <hr/>
      <h2>Matchmaker</h2>
      <button disabled={isEmpty} onClick={(e: React.MouseEvent) => {
       getMatch(e, props.selectedDogs, props.setHeroDog); 
      }}>
        Find my match!
      </button>
      {props.heroDog && <HeroDog dog={props.heroDog}/>
  }
    </div>
  );
}
