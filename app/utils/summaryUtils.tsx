import { Query } from '@/app/lib/definitions';
import { formatList } from '@/app/utils/globalUtils';

export function querySummary(query: Query, resultsCount: number) {
  const { breeds, sort } = query;
  const searchAllBreeds = breeds.length === 0 || breeds[0] === 'any';
  const breedListDisplay = searchAllBreeds ? 'all breeds' : formatList(breeds);
  const breedSort = sort.breed === 'asc' ? 'ascending' : 'descending';
  const resultsCountDisplay = resultsCount === 1 ?
    'There is 1 dog':
    `There are ${resultsCount} dogs`;

  return <>
    <p>{resultsCountDisplay} that matched these search criteria:</p>
    <ul>
      <li>Breeds: {breedListDisplay}</li>
      <li>Sorted in {breedSort} order by breed</li>
    </ul>
  </>
}

export function resultsRangeDisplay(currentPage: number, resultsCount: number): string {
  const RESULTS_PER_PAGE = 25;
  const isLastPage = resultsCount - (currentPage * RESULTS_PER_PAGE) <= 0;
  const lastResultNum = isLastPage ? resultsCount: currentPage * RESULTS_PER_PAGE;
  const firstResultNum = ((currentPage - 1) * RESULTS_PER_PAGE) + 1;

  return `Displaying ${firstResultNum} through ${lastResultNum}`;
}