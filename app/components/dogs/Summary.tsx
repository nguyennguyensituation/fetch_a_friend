import { Query } from '@/app/lib/definitions';

function resultsRangeDisplay(currentPage: number, resultsCount: number) {
  const isLastPage = resultsCount - (currentPage * 25) <= 0;
  const lastResultNum = isLastPage ? resultsCount: currentPage * 25;
  const firstResultNum = ((currentPage - 1) * 25) + 1;

  return `Showing ${firstResultNum} through ${lastResultNum}`;
}

function querySummary(query: Query, resultsCount: number): string {
  const { breeds, sort } = query;
  const numBreeds = breeds.length;
  let breedStr;

  if (numBreeds === 0 || breeds[0] === 'any') {
    breedStr = 'all breeds'
  } else if (numBreeds === 1) {
    breedStr = breeds[0];
  } else if (numBreeds === 2) {
    breedStr = breeds.join(' and ');
  } else {
    breedStr = `${breeds.slice(0, -1).join(', ')}, and ${breeds[numBreeds - 1]}`
  }

  const breedSort = sort.breed === 'asc' ? 'ascending' : 'descending';
  let resultsCountDisplay;

  if (resultsCount === 1) {
    resultsCountDisplay = 'There is 1 dog that matched your search criteria:';
  } else {
    resultsCountDisplay = `There a ${resultsCount} dogs that matched your search criteria:`;
  }

  return `${resultsCountDisplay}: ${breedStr} (sorted in ${breedSort} order by breed)`
}

export default function Summary(props: {
  queryData: Query,
  resultsCount: number,
  currentPage: number
}) {
  const { queryData, resultsCount, currentPage } = props;

  return (
    <div>
      <p>{querySummary(queryData, resultsCount)}</p>
      {resultsCount > 0 && <p>{resultsRangeDisplay(currentPage, resultsCount)}</p>}
    </div>
  );
}