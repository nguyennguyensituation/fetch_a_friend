import { Dog, PageNavUrls } from '@/app/lib/definitions';
import { BASE_URL } from './globalUtils';

// Populates data for next or prev set of Dog results
export async function fetchNextDogs(setResults: (results: Dog[]) => void,
  setNextPrev: (urls: PageNavUrls) => void,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  query: string,
  isNext: boolean): Promise<void> {
  try {
    // First, get arr of Dog IDs, sorted and filtered by queries
    const searchResponse = await fetch(BASE_URL + query, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!searchResponse.ok) {
      throw new Error("Failed to fetch dog ids");
    }

    // Next, get arr of Dog objects from filtered IDs
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
      throw new Error(`Failed to fetch ${isNext ? 'next' : 'previous'} page of dog objects`);
    }

    const dogData = await dogResponse.json();

    // Set results and page nav data
    setResults(dogData);
    setCurrentPage(isNext ? currentPage + 1 : currentPage - 1)
    setNextPrev({
      next: searchData.next ? searchData.next : '', 
      prev: searchData.prev ? searchData.prev: ''
    });
  } catch {
    throw new Error(`Failed to fetch ${isNext ? 'next' : 'previous'} page of dog objects`);
  }
}
