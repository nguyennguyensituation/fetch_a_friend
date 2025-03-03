import { Dog, PageNavUrls } from '@/app/lib/definitions';
import { fetchNextDogs } from '@/app/utils/dogNavUtils';

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