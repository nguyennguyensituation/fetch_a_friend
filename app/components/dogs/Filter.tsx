import { useState, useEffect } from 'react';
import { Dog, Query, PageNavUrls } from '@/app/lib/definitions';
import styles from './filter.module.css'
import { breedPlaceholder, getBreedOptions, fetchBreeds, handleQuery } from '@/app/utils/filterUtils';

export default function FilterForm(props: {
  setQueryData: (query: Query) => void,
  setResults: (results: Dog[]) => void,
  setResultsCount: (count: number) => void,
  setNextPrev: (urls: PageNavUrls) => void,
}) {
  const [breeds, setBreeds] = useState<string[]>();

  useEffect(() => {
      fetchBreeds(setBreeds);
    }, []);

  return (
    <form className={styles.filter} onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
      handleQuery(e, props.setQueryData);
      }}>
      <h2>Filter Dogs</h2>
      <fieldset>    
        <label htmlFor='selectedBreeds'>I am interested in&nbsp;
          <select name='selectedBreeds' multiple
            id='selectedBreeds'
            defaultValue={['any']}
            className={styles.breedOptions}>
            {breeds ? getBreedOptions(breeds) : breedPlaceholder}
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
      <button type="reset" className={styles.reset} disabled={!breeds}>Reset filter</button>
      <button type="submit" disabled={!breeds}>Filter</button>
    </form>
  );
}