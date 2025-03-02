import { useState, useEffect } from 'react';
import styles from "./dogs.module.css";
import Card from './Card';
import Nav from "./Nav"
import Summary from './Summary';

export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export type Query = {
  breeds: string[],
  sort: { breed: string}
}

export type PageNavUrls = {
  next: string,
  prev: string
}

async function fetchBreeds(setBreeds: (breeds: string[]) => void): Promise<void> {
  const res = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: 'include' });

  if (res.ok) {
    const data = await res.json();
    setBreeds(data);
  } else {
    throw new Error("There was an error getting the list of dog breeds");
  }
}

function formatQueries(queryData: Query): string {
  const breedSortQuery = `sort=breed:${queryData.sort.breed}`;
  let breedQuery;
  
  if (queryData.breeds.length === 0 || queryData.breeds[0] === 'any') {
    breedQuery = ''
  } else {
    breedQuery = queryData.breeds.map(breed => `&breeds=${breed}`).join('');
  }

  return "https://frontend-take-home-service.fetch.com/dogs/search?" + breedSortQuery + breedQuery;
}

async function fetchDogs(setResults: (results: Dog[]) => void,
  setResultsCount: (numResults: number) => void,
  setNextPrev: (urls: PageNavUrls) => void,
  queryData: Query,
  query?: string): Promise<void> {
  try {
    const url = query ? "https://frontend-take-home-service.fetch.com" + query : formatQueries(queryData);

    // Get array of Dog IDs, sorted and filtered by queries
    const searchResponse = await fetch(url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!searchResponse.ok) {
      throw new Error("Failed to fetch dog ids");
    }

    // Get Dog objects from filtered IDs
    const searchData = await searchResponse.json();
    const dogIds = searchData.resultIds;
    const dogResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dogIds)
    })

    if (!dogResponse.ok) {
      throw new Error("Failed to fetch dog objects");
    }

    const dogData = await dogResponse.json();
    setResultsCount(searchData.total)
    setResults(dogData);

    setNextPrev({ next: searchData.next ? searchData.next : '', 
      prev: searchData.prev ? searchData.prev: '' });
  } catch {
    throw new Error("Failed to fetch dog objects");
  }
}

function handleQuery(event: React.FormEvent,
  setQueryData: (query: Query) => void) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const selectedBreeds = formData.getAll('selectedBreeds') as string[];
  const sortBreeds = formData.get('sortBreeds') as string;

  setQueryData({
    breeds: selectedBreeds,
    sort: { breed: sortBreeds ? sortBreeds : 'asc'}
  })
}

const breedPlaceholder = (<option>Loading breeds...</option>);
const defaultQuery: Query = {
  breeds: ['any'],
  sort: { breed: 'asc'}
}
const defaultNextPrev: PageNavUrls = {
  next: '',
  prev: ''
}

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