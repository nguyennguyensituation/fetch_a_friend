import { useState, useEffect } from 'react';
import { Dog, Query, PageNavUrls } from '@/app/lib/definitions';
import styles from './filter.module.css'
import { breedPlaceholder, getBreedOptions, fetchBreeds, handleQuery, getAgeOptions } from '@/app/utils/filterUtils';

export default function FilterForm(props: {
  setQueries: (queries: Query) => void,
  setResults: (results: Dog[]) => void,
  setResultsCount: (count: number) => void,
  setNextPrev: (urls: PageNavUrls) => void,
  setCurrentPage: (page: number) => void
}) {
  const [breeds, setBreeds] = useState<string[]>();

  useEffect(() => {
      fetchBreeds(setBreeds);
    }, []);

  return (
    <form className={styles.filter} onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
      handleQuery(e, props.setQueries, props.setNextPrev, props.setCurrentPage);
      }}>

      <h2 className={styles.title}>Filter Dogs</h2>

      <fieldset className={styles.breeds}>    
        <label htmlFor='selectedBreeds'>Selected breed(s)&nbsp;</label>
        <select name='selectedBreeds' multiple
            id='selectedBreeds'
            defaultValue={['any']}
            className={styles.breedOptions}>
            {breeds ? getBreedOptions(breeds) : breedPlaceholder}
          </select>
      </fieldset>

      <fieldset className={styles.ageMin}>    
        <label htmlFor='ageMin'>Age min &nbsp;</label>
        <select name='ageMin'
            id='ageMin'
            defaultValue={'0'}
            className={styles.ageMin}>
            {getAgeOptions(true)}
          </select>
      </fieldset>

      <fieldset className={styles.ageMax}>    
        <label htmlFor='ageMax'>Age max&nbsp;</label>
        <select name='ageMax'
            id='ageMax'
            defaultValue={'31'}
            className={styles.ageMax}>
            {getAgeOptions(false)}
          </select>
      </fieldset>

      <fieldset className={styles.sortBreeds}>
        <label htmlFor='sortBreeds'>Sort breed(s) from&nbsp;</label>
        <select name='sortBreeds' id='sortBreeds' defaultValue="asc">
          <option value="asc" >A to Z</option>
          <option value="desc">Z to A</option>
        </select>
      </fieldset>

      <div className={styles.buttonContainer}>
        <button type="reset" className={styles.reset} disabled={!breeds}>Reset filter</button>
        <button type="submit" className={styles.submit} disabled={!breeds}>Filter</button>
      </div>
      
    </form>
  );
}