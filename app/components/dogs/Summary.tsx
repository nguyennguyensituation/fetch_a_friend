import { Query } from '@/app/lib/definitions';
import { resultsRangeDisplay, querySummary } from '@/app/utils/summaryUtils';

export default function Summary(props: {
  queries: Query,
  resultsCount: number,
  currentPage: number
}) {
  const { queries, resultsCount, currentPage } = props;

  return (
    <div>
      <p>{querySummary(queries, resultsCount)}</p>
      {resultsCount > 0 && <p>{resultsRangeDisplay(currentPage, resultsCount)}</p>}
    </div>
  );
}