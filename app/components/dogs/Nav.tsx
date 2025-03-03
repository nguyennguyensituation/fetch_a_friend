import styles from './nav.module.css';

import { Dog, PageNavUrls } from '@/app/lib/definitions';
import { navButton } from '@/app/utils/dogNavUtils';

export default function Nav(props: {
  setResults: (results: Dog[]) => void,
  nextPrev: PageNavUrls,
  setNextPrev: (urls: PageNavUrls) => void,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  resultsCount: number
}) {
  const { nextPrev, setResults, setNextPrev, currentPage, setCurrentPage, resultsCount } = props;
  const lastPage = Math.ceil(resultsCount / 25);
  const prevBtn = navButton('prev', currentPage, lastPage, setResults, setNextPrev, setCurrentPage, nextPrev.prev);
  const nextBtn = navButton('next', currentPage, lastPage, setResults, setNextPrev, setCurrentPage, nextPrev.next);

  return ( 
    <nav className={styles.nav}>
        {prevBtn}
        <p>Page {currentPage} of {lastPage}</p>
        {nextBtn}       
    </nav>
  );
}