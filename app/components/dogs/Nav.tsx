import styles from './Nav.module.css';
import { Dog, PageNavUrls } from './Dogs';

async function fetchNextDogs(setResults: (results: Dog[]) => void,
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
    setCurrentPage(isNext ? currentPage + 1 : currentPage - 1)
    setResults(dogData);
    setNextPrev({ next: searchData.next ? searchData.next : '', 
      prev: searchData.prev ? searchData.prev: '' });
  } catch {
    throw new Error(`Failed to fetch ${isNext ? 'next' : 'previous'} page of dog objects`);
  }
}

export default function Nav(props: {
  setResults: (results: Dog[]) => void,
  nextPrev: PageNavUrls,
  setNextPrev: (urls: PageNavUrls) => void,
  currentPage: number,
  setCurrentPage: (page: number) => void,
}) {
  const { nextPrev, setResults, setNextPrev, currentPage, setCurrentPage } = props;
  return ( 
    <nav>
       {nextPrev.prev && <button onClick={() => {
          fetchNextDogs(setResults, setNextPrev, currentPage, setCurrentPage, nextPrev.prev, false)
        }}>Back</button>}
        <p>&mdash;{currentPage}&mdash;</p>
        {nextPrev.next && <button onClick={() => {
          fetchNextDogs(setResults, setNextPrev, currentPage, setCurrentPage, nextPrev.next, true)
        }}>Next</button>}
    </nav>
  );
}