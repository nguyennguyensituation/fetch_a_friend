import { useState, useEffect } from 'react';
import styles from "./dogs.module.css";
import FilterForm from './Filter';
import Nav from "./Nav"
import Summary from './Summary';
import Results from './Results';
import { Dog, Query, PageNavUrls } from '@/app/lib/definitions';
import { defaultQuery, defaultNextPrev, fetchDogs } from '@/app/utils/dogUtils';

export default function Dogs(props: {
  setCurrentDog: (dog: Dog) => void,
  setDisplayFaves: (display: boolean) => void,
  selectedDogs: Dog[],
  setSelectedDogs: (selection: Dog[]) => void}) {
  const [queries, setQueries] = useState<Query>(defaultQuery);
  const [results, setResults] = useState<Dog[]>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPrev, setNextPrev] = useState<PageNavUrls>(defaultNextPrev);

  useEffect(() => {
    fetchDogs(setResults, setResultsCount, setNextPrev, queries);
  }, [queries]);
  
  return (
    <section className={styles.dogs}>
      <FilterForm setQueries={setQueries}
        setNextPrev={setNextPrev}
        setResults={setResults}
        setResultsCount={setResultsCount}
        setCurrentPage={setCurrentPage}/>
      <Summary queries={queries}
        resultsCount={resultsCount}
        currentPage={currentPage}/>
      <Results 
        results={results}
        setCurrentDog={props.setCurrentDog}
        setDisplayFaves={props.setDisplayFaves}
        selectedDogs={props.selectedDogs}
        setSelectedDogs={props.setSelectedDogs}
      />
      <Nav setResults={setResults}
        nextPrev={nextPrev}
        setNextPrev={setNextPrev}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        resultsCount={resultsCount}/>
    </section>
  );
}