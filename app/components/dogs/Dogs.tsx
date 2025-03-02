import { useState, useEffect } from 'react';
import styles from "./dogs.module.css";
import Card from './Card';
import Nav from "./Nav"
import Summary from './Summary';
import { Dog, Query, PageNavUrls } from '@/app/lib/definitions';
import { breedPlaceholder, defaultQuery, defaultNextPrev, fetchBreeds, fetchDogs, handleQuery } from '@/app/utils/dogUtils';

export default function Dogs() {
  const [breeds, setBreeds] = useState<string[]>();
  const breedOptions = (<>
      <option value='any'>Any breed</option>
      {breeds?.map((breed, idx) => {
        return <option key={idx} value={breed}>{breed}</option>
      })}
    </>)
  const [queryData, setQueryData] = useState<Query>(defaultQuery);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [results, setResults] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPrev, setNextPrev] = useState<PageNavUrls>(defaultNextPrev);
  const dogList = results?.map((dog, idx) => <Card data={dog} key={idx} isPriority={idx === 0}/>)

  useEffect(() => {
    // Populate breed list and default Dog results
    fetchDogs(setResults, setResultsCount, setNextPrev, queryData);
    fetchBreeds(setBreeds);
  }, []);

  return (
    <section className={styles.dogs}>
      <form className={styles.filter} onSubmit={(e) => {
        handleQuery(e, setQueryData);
        fetchDogs(setResults, setResultsCount, setNextPrev, queryData);
        }}>
        <h2>Find Dogs</h2>
        <fieldset>    
          <label htmlFor='selectedBreeds'>I am interested in
            <select name='selectedBreeds' multiple
              id='selectedBreeds'
              defaultValue={['any']}
              className={styles.breedOptions}>
              {breeds ? breedOptions : breedPlaceholder}
            </select>
            .
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor='sortBreeds'>Sort breed(s) in</label>
          <select name='sortBreeds' id='sortBreeds' defaultValue="asc">
            <option value="asc" >ascending order (A to Z)</option>
            <option value="desc">descending order (Z to A)</option>
          </select>
        </fieldset>
        <button type="reset" className={styles.reset}>Reset filter</button>
        <button type="submit">Filter</button>
      </form>

      <Summary queryData={queryData} resultsCount={resultsCount} currentPage={currentPage}/>
      <Nav setResults={setResults} nextPrev={nextPrev} setNextPrev={setNextPrev} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

      <div>
        <div className={styles.resultsContainer}>
        {dogList ? dogList : <p>(No results found)</p>}
        </div>
      </div>
    </section>
  );
}