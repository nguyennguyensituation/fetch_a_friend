import { useState, useEffect } from 'react';
import styles from "./dogs.module.css";
import Card from './Card';

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

type Query = {
  breeds: string[],
  sort: { breed: string}
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

function formatUrl(baseUrl: string,
  query: Query): string {
  const breedSortQuery = `sort=breed:${query.sort.breed}`;
  let breedQuery;
  
  if (query.breeds.length === 0 || query.breeds[0] === 'any') {
    breedQuery = ''
  } else {
    breedQuery = query.breeds.map(breed => `&breeds=${breed}`).join('');
  }

  return baseUrl + breedSortQuery + breedQuery;
}

async function fetchDogs(query: Query,
  setResults: (results: Dog[]) => void): Promise<void> {
  try {
    const url = formatUrl("https://frontend-take-home-service.fetch.com/dogs/search?", query)
    const idResponse = await fetch(url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!idResponse.ok) {
      throw new Error("Failed to fetch dog ids");
    }

    const idData = await idResponse.json();
    const dogIds = idData.resultIds;

    const dogResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dogIds)
    })

    if (!dogResponse.ok) {
      throw new Error("Failed to fetch dog objects");
    }

    // Get Dog objects from filtered ids
    const dogData = await dogResponse.json();
   
    setResults(dogData);
  } catch {
    throw new Error("Failed to fetch dog objects");
  }
}

function handleQuery(event: React.FormEvent,
  setQuery: (query: Query) => void) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const selectedBreeds = formData.getAll('selectedBreeds') as string[];
  const sortBreeds = formData.get('sortBreeds') as string;

  setQuery({
    breeds: selectedBreeds,
    sort: { breed: sortBreeds ? sortBreeds : 'asc'}
  })
}

function querySummary(query: Query): string {
  const { breeds, sort } = query;
  const numBreeds = breeds.length;
  let breedStr;

  if (numBreeds === 0 || breeds[0] === 'any') {
    breedStr = 'all breeds'
  } else if (numBreeds === 1) {
    breedStr = breeds[0];
  } else if (numBreeds === 2) {
    breedStr = breeds.join(' and ');
  } else {
    breedStr = `${breeds.slice(0, -1).join(', ')}, and ${breeds[numBreeds - 1]}`
  }

  const breedSort = sort.breed === 'asc' ? 'ascending' : 'descending';

  return `Showing results for ${breedStr}, sorted in ${breedSort} order`
}

const breedPlaceholder = (<option>Loading breeds...</option>);
const defaultQuery: Query = {
  breeds: ['any'],
  sort: { breed: 'asc'}
}

export default function Dogs() {
  const [breeds, setBreeds] = useState<string[]>();
  const breedOptions = (<>
      <option value='any'>Any breed</option>
      {breeds?.map((breed, idx) => {
        return <option key={idx} value={breed}>{breed}</option>
      })}
    </>)
  const [query, setQuery] = useState<Query>(defaultQuery);
  const [results, setResults] = useState<Dog[]>([]);
  const dogList = results?.map((dog, idx) => <Card data={dog} key={idx} isPriority={idx === 0}/>)

  useEffect(() => {
    // Populate breed list and default Dog results
    fetchDogs(query, setResults);
    fetchBreeds(setBreeds);
  }, []);

  return (
    <section className={styles.dogs}>
      <form className={styles.filter} onSubmit={(e) => {
        handleQuery(e, setQuery);
        fetchDogs(query, setResults);
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

      <div className={styles.query}>
        <p>{querySummary(query)}</p>
        <p>Total results: TK</p>
      </div>

      <div>
        <div className={styles.resultsContainer}>
        {dogList ? dogList : <p>(No results found)</p>}
        </div>
      </div>
    </section>
  );
}