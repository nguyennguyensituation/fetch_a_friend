import styles from '../favorites/favorites.module.css';
import { Dog } from '@/app/lib/definitions';
import Item from './Item';
import Match from './Match';
import { handleSelect } from '@/app/utils/favoritesUtils';

export default function Favorites(props: {
  selectedDogs: Dog[],
  setSelectedDogs: (selectedDogs: Dog[]) => void,
  heroDog?: Dog,
  setHeroDog: (dog: Dog) => void,
  setCurrentDog: (dog: Dog) => void,
  setDisplayFaves: (display: boolean) => void }) {
  const faves = props.selectedDogs;
  const total = faves.length;
  const totalDisplay = total === 1 ? '1 dog' : `${total} dogs`
  const faveList = (faves.map((dog: Dog, idx: number) => {
    return <Item 
      key={idx}
      dog={dog}
      selectedDogs={faves}
      setSelectedDogs={props.setSelectedDogs}
      handleSelect={(e: React.MouseEvent) => {
        handleSelect(e, dog, props.setCurrentDog, props.setDisplayFaves)
      } }/>;
    }));

  return (
    <section className={styles.favorites}>
      <h2>Your Favorite Dogs</h2>
      <div className={styles.faveContainer}>
        {total === 0 ?
          <p>Add your favorite dogs to get matched to a new four-legged friend.</p> :
          <>
          <p>Total: {totalDisplay}</p>
          {faveList}
          </>
        }
      </div>
      
      <Match selectedDogs={faves}
        heroDog={props.heroDog}
        setHeroDog={props.setHeroDog}/>
    </section>
  );
}
