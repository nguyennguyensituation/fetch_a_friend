import { useRef, useEffect } from 'react';
import styles from './results.module.css';
import { Dog } from '@/app/lib/definitions';
import Card from './Card';
import { alreadySelected } from '@/app/utils/profileUtils';
import { selectFromCard } from '@/app/utils/resultsUtils';

export default function Results(props: {
  results: Dog[];
  setCurrentDog: (dog: Dog) => void,
  setDisplayFaves: (display: boolean) => void,
  selectedDogs: Dog[],
  setSelectedDogs: (selection: Dog[]) => void}) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const dogCards = props.results?.map((dog, idx) => {
    return <Card data={dog} 
      key={idx}
      isPriority={idx === 0}
      setCurrentDog={props.setCurrentDog}
      setDisplayFaves={props.setDisplayFaves}
      isSelected={alreadySelected(dog.id, props.selectedDogs)}
      handleSelect={(e: React.MouseEvent) => selectFromCard(e, dog, props.selectedDogs, props.setSelectedDogs)}
      />
  });

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollTop = 0;
    }
  }, [props.results]);

  return (
    <div className={styles.resultsContainer} ref={resultsRef} >
      {dogCards ? dogCards : <p>(No results found)</p>}
    </div>
  );
}
