import { Dog, PageNavUrls } from '@/app/lib/definitions';

export async function fetchNextDogs(setResults: (results: Dog[]) => void,
  setNextPrev: (urls: PageNavUrls) => void,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  query: string,
  isNext: boolean): Promise<void> {
  try {
    const url ='https://frontend-take-home-service.fetch.com' + query;

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
      throw new Error(`Failed to fetch ${isNext ? 'next' : 'previous'} page of dog objects`);
    }

    const dogData = await dogResponse.json();

    setResults(dogData);
    setCurrentPage(isNext ? currentPage + 1 : currentPage - 1)
    setNextPrev({ next: searchData.next ? searchData.next : '', 
      prev: searchData.prev ? searchData.prev: '' });
  } catch {
    throw new Error(`Failed to fetch ${isNext ? 'next' : 'previous'} page of dog objects`);
  }
}