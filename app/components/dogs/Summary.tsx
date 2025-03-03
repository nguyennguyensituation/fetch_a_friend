import styles from './summary.module.css';

import { Query } from '@/app/lib/definitions';
import { resultsRangeDisplay, querySummary } from '@/app/utils/summaryUtils';

export default function Summary(props: {
  queries: Query,
  resultsCount: number,
  currentPage: number
}) {
  const { queries, resultsCount, currentPage } = props;

  return (
    <div className={styles.summary}>
      {querySummary(queries, resultsCount)}
      {resultsCount > 0 && <p>{resultsRangeDisplay(currentPage, resultsCount)}</p>}
    </div>
  );
}