import { useState, useEffect } from 'react';
import { Dog, Query, PageNavUrls } from '@/app/lib/definitions';
import styles from './filter.module.css'
import { breedPlaceholder, fetchBreeds, handleQuery, fetchDogs } from '@/app/utils/filterUtils';

export default function FilterForm(props: {
  queryData: Query,
  setQueryData: (query: Query) => void,
  setResults: (results: Dog[]) => void,
  setResultsCount: (count: number) => void,
  setNextPrev: (urls: PageNavUrls) => void,
}) {
  const [breeds, setBreeds] = useState<string[]>();
  const breedOptions = (<>
      <option value='any'>Any breed</option>
      {breeds?.map((breed, idx) => {
        return <option key={idx} value={breed}>{breed}</option>
      })}
    </>);
  const { queryData,setQueryData, setResults, setResultsCount, setNextPrev } = props;

  useEffect(() => {
      // Populate breed list and default Dog results on load
      // fetchDogs(setResults, setResultsCount, setNextPrev, queryData);
      fetchBreeds(setBreeds);
    }, []);

  return (
    <form className={styles.filter} onSubmit={(e) => {
      e.preventDefault();
      handleQuery(e, setQueryData);
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
  );
}