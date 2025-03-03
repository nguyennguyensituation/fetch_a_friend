import { Query } from '@/app/lib/definitions';
import { resultsRangeDisplay, querySummary } from '@/app/utils/summaryUtils';

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