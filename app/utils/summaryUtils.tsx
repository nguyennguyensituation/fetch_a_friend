import { Query } from '@/app/lib/definitions';
import { formatList } from '@/app/utils/globalUtils';
import styles from '@/app/components/dogs/summary.module.css';

function getAgeRangeText(ageMin: number,
  ageMax: number ): string {
  if (ageMin === ageMax) {
    return `that are ${ageMin} years old`
  } else if (ageMin === 0) {
    return `that are up to ${ageMax} years old`
  } else {
    return `that are between ${ageMin} and ${ageMax} years old`
  }
}

export function querySummary(query: Query, resultsCount: number) {
  const { breeds, sort, ageMin, ageMax } = query;
  const resultsDisplay = resultsCount.toLocaleString(); 
  const searchAllBreeds = breeds.length === 0 || breeds[0] === 'any';
  const breedListDisplay = searchAllBreeds ? 'all breeds' : formatList(breeds);
  const breedSort = sort.breed === 'asc' ? 'ascending' : 'descending';
  const ageRangeDisplay = getAgeRangeText(ageMin, ageMax);
  const validAgeRange = ageMax >= ageMin;

  return <>
    { validAgeRange ?
      <p>Showing <span className={styles.underline}>{resultsDisplay}</span> matches for: {breedListDisplay} {ageRangeDisplay} (in {breedSort} order by breed)</p> :
      <p>That&apos;s not a valid age range. Please update your age filters.</p>}
  </>
}

export function resultsRangeDisplay(currentPage: number, resultsCount: number): string {
  const RESULTS_PER_PAGE = 25;
  const isLastPage = resultsCount - (currentPage * RESULTS_PER_PAGE) <= 0;
  const lastResultNum = isLastPage ? resultsCount: currentPage * RESULTS_PER_PAGE;
  const firstResultNum = ((currentPage - 1) * RESULTS_PER_PAGE) + 1;

  return `${firstResultNum} to ${lastResultNum}`;
}