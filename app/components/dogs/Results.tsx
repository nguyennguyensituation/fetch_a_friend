import { useRef, useEffect } from 'react';
import styles from './results.module.css';
import { Dog } from '@/app/lib/definitions';
import Card from './Card';

export default function Results(props: {
  results: Dog[];
}) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const dogCards = props.results?.map((dog, idx) => <Card data={dog} key={idx} isPriority={idx === 0}/>);

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