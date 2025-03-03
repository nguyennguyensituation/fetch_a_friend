import styles from './results.module.css';
import { Dog } from '@/app/lib/definitions';
import Card from './Card';

export default function Results(props: {
  results: Dog[];
}) {
  const dogCards = props.results?.map((dog, idx) => <Card data={dog} key={idx} isPriority={idx === 0}/>);

  return (
    <div>
        <div className={styles.resultsContainer}>
        {dogCards ? dogCards : <p>(No results found)</p>}
        </div>
      </div>
  );
}