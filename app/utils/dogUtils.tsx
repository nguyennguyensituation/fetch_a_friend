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
  const url = BASE_URL + "/dogs/search?";
  const breedSortQuery = `sort=breed:${queries.sort.breed}`;
  const findAllBreeds = queries.breeds[0] === 'any';
  const breedQuery = queries.breeds.length === 0 || findAllBreeds ?
    '' : 
    queries.breeds.map(breed => `&breeds=${breed}`).join('');

  return url + breedSortQuery + breedQuery;
}

// Populates data for results
export async function fetchDogs(setResults: (results: Dog[]) => void,
  setResultsCount: (numResults: number) => void,
  setNextPrev: (urls: PageNavUrls) => void,
  queryData: Query): Promise<void> {
  try {
    const idsUrl = formatQueries(queryData);

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
    const resultsUrl = BASE_URL + "/dogs";
    const dogResponse = await fetch(resultsUrl, {
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