import { Query } from '@/app/lib/definitions';
import { formatList } from '@/app/utils/globalUtils';
import styles from '@/app/components/dogs/summary.module.css';

function getAgeRangeText(ageMin: number,
  ageMax: number ): string {
  if (ageMin === 0 && ageMax == 0) {
    return `that are less than a year old`;
  } else if (ageMin === 1 && ageMax == 1) {
    return `that are a year old`;
  } else if (ageMin === ageMax) {
    return `that are ${ageMin} years old`;
  } else if (ageMin === 0 && ageMax === 31) {
    return '';
  } else if (ageMin === 0) {
    return `up to ${ageMax} years old`;
  } else if (ageMin === 1 && ageMax === 31) {
    return `that are at least a year old`;
  } else if (ageMax === 31) {
    return `that are at least ${ageMin} years old`;
  } else {
    return `between ${ageMin} and ${ageMax} years old`
  }
}

export function querySummary(query: Query, resultsCount: number) {
  const { breeds, sort, ageMin, ageMax } = query;
  const resultsDisplay = resultsCount.toLocaleString(); 
  const searchAllBreeds = breeds.length === 0 || breeds[0] === 'any';
  const breedListDisplay = searchAllBreeds ? 'all dogs' : formatList(breeds);
  const breedSort = sort.breed === 'asc' ? 'ascending' : 'descending';
  const ageRangeDisplay = getAgeRangeText(ageMin, ageMax);
  const validAgeRange = ageMax >= ageMin;

  if (!validAgeRange) {
    return <p>That&apos;s not a valid age range. Please update your age filters.</p>;
  } else if (resultsCount === 0) {
    return <p>No dogs matched your criteria: {breedListDisplay} {ageRangeDisplay}</p>
  } else {
    return <p>Showing <span className={styles.underline}>{resultsDisplay}</span> matches for: {breedListDisplay} {ageRangeDisplay} (in {breedSort} order by breed)</p>
  }
}

export function resultsRangeDisplay(currentPage: number, resultsCount: number): string {
  const RESULTS_PER_PAGE = 25;
  const isLastPage = resultsCount - (currentPage * RESULTS_PER_PAGE) <= 0;
  const lastResultNum = isLastPage ? resultsCount: currentPage * RESULTS_PER_PAGE;
  const firstResultNum = ((currentPage - 1) * RESULTS_PER_PAGE) + 1;

  return `${firstResultNum} to ${lastResultNum}`;
}