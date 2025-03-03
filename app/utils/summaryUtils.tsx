import { Query } from '@/app/lib/definitions';

function formatList(list: string[]): string {
  if (list.length === 1) {
    return list[0];
  } else if (list.length === 2) {
    return `${list[0]} and ${list[1]}}`;
  } else {
    // List formatted with Oxford comma!
    return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`;
  }
}

export function querySummary(query: Query, resultsCount: number): string {
  const { breeds, sort } = query;
  const searchAllBreeds = breeds.length === 0 || breeds[0] === 'any';
  const breedListDisplay = searchAllBreeds ? 'all breeds' : formatList(breeds);
  const breedSort = sort.breed === 'asc' ? 'ascending' : 'descending';
  const resultsCountDisplay = resultsCount === 1 ?
    'There is 1 dog':
    `There are ${resultsCount} dogs`;

  return `${resultsCountDisplay} that matched your search criteria: ${breedListDisplay} (sorted in ${breedSort} order by breed)`
}

export function resultsRangeDisplay(currentPage: number, resultsCount: number): string {
  const RESULTS_PER_PAGE = 25;
  const isLastPage = resultsCount - (currentPage * RESULTS_PER_PAGE) <= 0;
  const lastResultNum = isLastPage ? resultsCount: currentPage * RESULTS_PER_PAGE;
  const firstResultNum = ((currentPage - 1) * RESULTS_PER_PAGE) + 1;

  return `Showing ${firstResultNum} through ${lastResultNum}`;
}