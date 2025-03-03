import { Dog, Query, PageNavUrls } from '@/app/lib/definitions';
import { BASE_URL } from './globalUtils';

export const defaultQuery: Query = {
  breeds: ['any'],
  sort: { breed: 'asc'}
}

export const defaultNextPrev: PageNavUrls = {
  next: '',
  prev: ''
}

function formatQueries(queries: Query): string {
  const path = "/dogs/search?";
  const breedSortQuery = `sort=breed:${queries.sort.breed}`;
  const selectedAllBreeds = queries.breeds.length === 1 && queries.breeds[0] === 'any';
  const breedQuery = selectedAllBreeds ? '' :
    queries.breeds.map(breed => (breed !== 'any') ? `&breeds=${breed}` : '').join('');

  return BASE_URL + path + breedSortQuery + breedQuery;
}

// Populates data for results
export async function fetchDogs(setResults: (results: Dog[]) => void,
  setResultsCount: (numResults: number) => void,
  setNextPrev: (urls: PageNavUrls) => void,
  queries: Query): Promise<void> {
  try {
    const idsUrl = formatQueries(queries);

    // First, get arr of Dog IDs, sorted and filtered by queries
    const searchResponse = await fetch(idsUrl, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!searchResponse.ok) {
      throw new Error("Failed to fetch dog ids");
    }

    // Next, get Dog objects from Dog IDs arr
    const searchData = await searchResponse.json();
    const dogIds = searchData.resultIds;
    const dogsPath = "/dogs";
    const dogResponse = await fetch(BASE_URL + dogsPath, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dogIds)
    })

    if (!dogResponse.ok) {
      throw new Error("Failed to fetch dog objects");
    }

    const dogData = await dogResponse.json();

    // Set results and nav links
    setResults(dogData);
    setResultsCount(searchData.total)
    setNextPrev({
      next: searchData.next ? searchData.next : '', 
      prev: searchData.prev ? searchData.prev: ''
    });
  } catch {
    throw new Error("Failed to fetch dog objects");
  }
}