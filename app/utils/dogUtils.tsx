import { Dog, Query, PageNavUrls } from '@/app/lib/definitions';
import { BASE_URL } from './globalUtils';

export const defaultQuery: Query = {
  breeds: ['any'],
  sort: { breed: 'asc'},
  ageMin: 0,
  ageMax: 31
}

export const defaultNextPrev: PageNavUrls = {
  next: '',
  prev: ''
}

function formatBreedQuery(queries: Query) {
  const selectedAll = queries.breeds.length === 1 && queries.breeds[0] === 'any';

  if (selectedAll) return '';

  return queries.breeds.map(breed => {
    return (breed !== 'any') ? `&breeds=${breed}` : ''
  }).join('');
}

function formatQueries(queries: Query): string {
  const path = "/dogs/search?";
  const breedSortQuery = `sort=breed:${queries.sort.breed}`;
  const breedQuery = formatBreedQuery(queries);
  const ageQueries = `&ageMin=${queries.ageMin}&ageMax=${queries.ageMax}`;

  return BASE_URL + path + breedSortQuery + breedQuery + ageQueries;
}

export async function getDogData(ids: string[]): Promise<Dog[]> {
  const path = "/dogs";
  const response = await fetch(BASE_URL + path, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ids)
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dog objects");
  }

  const data = await response.json();

  return data;
}

// Populates data for results
export async function fetchDogs(setResults: (results: Dog[]) => void,
  setResultsCount: (numResults: number) => void,
  setNextPrev: (urls: PageNavUrls) => void,
  queries: Query): Promise<void> {
  try {
    // Get array of Dog ids, filtered and sorted by queries
    const idsUrl = formatQueries(queries);
    const searchResponse = await fetch(idsUrl, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!searchResponse.ok) {
      throw new Error("Failed to fetch dog ids");
    }

    // Get array of Dog objects
    const searchData = await searchResponse.json();
    const dogIds = searchData.resultIds;
    const dogData = await getDogData(dogIds);

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
