import { Query } from '@/app/lib/definitions';
import { formatList } from '@/app/utils/globalUtils';
import styles from '@/app/components/dogs/summary.module.css';

export function querySummary(query: Query, resultsCount: number) {
  const { breeds, sort } = query;
  const resultsDisplay = resultsCount.toLocaleString(); 
  const searchAllBreeds = breeds.length === 0 || breeds[0] === 'any';
  const breedListDisplay = searchAllBreeds ? 'all breeds' : formatList(breeds);
  const breedSort = sort.breed === 'asc' ? 'ascending' : 'descending';

  return <>
    <p>Showing <span className={styles.underline}>{resultsDisplay}</span> matches for: {breedListDisplay} (in {breedSort} order by breed)</p>
  </>
}

export function resultsRangeDisplay(currentPage: number, resultsCount: number): string {
  const RESULTS_PER_PAGE = 25;
  const isLastPage = resultsCount - (currentPage * RESULTS_PER_PAGE) <= 0;
  const lastResultNum = isLastPage ? resultsCount: currentPage * RESULTS_PER_PAGE;
  const firstResultNum = ((currentPage - 1) * RESULTS_PER_PAGE) + 1;

  return `${firstResultNum} to ${lastResultNum}`;
}