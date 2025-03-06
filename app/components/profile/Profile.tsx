import { Dog } from '@/app/lib/definitions';
import Image from 'next/image';
import styles from './profile.module.css';
import { getAgeDisplay } from '@/app/utils/globalUtils';
import { updateSelectedDogsDisplay, alreadySelected } from '@/app/utils/profileUtils';

export default function Profile(props: {
  currentDog?: Dog,
  selectedDogs: Dog[],
  setSelectedDogs: (dogs: Dog[]) => void }) {
  if (props.currentDog) {
    const { selectedDogs, setSelectedDogs, currentDog } = props;
    const { id, img, name, age, zip_code, breed } = currentDog;
    const ageDisplay = getAgeDisplay(age);
    const altTextDisplay = `${ageDisplay} ${breed} named ${name}`;
    const isSelected = alreadySelected(id, selectedDogs);
    const buttonText = isSelected ?
      <span className={styles.selected}>&#9829; Saved</span> :
      <span>&#9829; Save</span>;
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (currentDog) updateSelectedDogsDisplay(currentDog, selectedDogs, setSelectedDogs);
    }

    return (
      <article className={styles.profile}>
        <div className={styles.details}>
          <h2 className={styles.name}>{name}</h2>
          <button className={styles.btn} onClick={handleClick}>
            {buttonText}
          </button>
          <p className={styles.breed}>Breed: {breed}</p>
          <p className={styles.age}>Age: {ageDisplay}</p>
          <p className={styles.zip}>ZIP code: {zip_code}</p>
        </div>
        <figure>
          <Image src={img}
            alt={altTextDisplay}
            width={0}
            height={0}
            sizes="100vw"
          />
        </figure>
      </article>
    );
  } 

  return (<article className={styles.profile}></article>);
}
