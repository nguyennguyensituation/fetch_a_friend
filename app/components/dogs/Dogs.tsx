import { useState, useEffect } from 'react';
import styles from "./dogs.module.css";
import Profile from './Profile';

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
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

async function fetchDogs(setResults: (results: Dog[]) => void): Promise<void> {
  try {
    const idResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs/search", {
      credentials: 'include'
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
    const dogData = await dogResponse.json();
    setResults(dogData);
  } catch {
    throw new Error("Failed to fetch dog objects");
  }
}

export default function Dogs() {
  const [breeds, setBreeds] = useState<string[]>();
  const defaultBreedlist = (<option>Loading breeds...</option>);
  const breedList = breeds?.map((breed, idx) => {
    return <option key={idx}>{breed}</option>
  })
  const [results, setResults] = useState<Dog[]>();
  const dogList = results?.map((dog, idx) => <Profile data={dog} key={idx}/>)

  useEffect(() => {
    // Populate breed list and default results
    fetchBreeds(setBreeds);
    fetchDogs(setResults);
  }, []);

  return (
    <section className={styles.dogs}>
      <h2>Dogs</h2>
      <form>
        <fieldset>
          <h3>Filter</h3>
          <label>Breed</label>
          <select>
            {breeds ? breedList : defaultBreedlist}
          </select>
        </fieldset>
      </form>

      <div>
        <p>Results for: all dogs</p>
        {dogList ? dogList : <p>(No results found)</p>}
      </div>
    </section>
  );
}