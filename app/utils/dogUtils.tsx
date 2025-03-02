import { Dog, Query, PageNavUrls } from '@/app/lib/definitions';

export async function fetchBreeds(setBreeds: (breeds: string[]) => void): Promise<void> {
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

export async function fetchDogs(setResults: (results: Dog[]) => void,
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

    setResults(dogData);
    setResultsCount(searchData.total)
    setNextPrev({ next: searchData.next ? searchData.next : '', 
      prev: searchData.prev ? searchData.prev: '' });
  } catch {
    throw new Error("Failed to fetch dog objects");
  }
}

export function handleQuery(event: React.FormEvent,
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

export const breedPlaceholder = (<option>Loading breeds...</option>);

export const defaultQuery: Query = {
  breeds: ['any'],
  sort: { breed: 'asc'}
}

export const defaultNextPrev: PageNavUrls = {
  next: '',
  prev: ''
}
