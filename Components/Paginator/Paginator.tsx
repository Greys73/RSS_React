import styles from './Paginator.module.css';
import { useRouter } from 'next/router';

type TPagingtorProps = {
  curPage: number;
  maxVal: number;
};

function Paginator({ curPage, maxVal }: TPagingtorProps) {
  const router = useRouter();
  const { query } = router;

  const setPage = (val: number) => {
    router.push({ query: { ...query, page: val || 1 } });
  };

  const calcValue = (step: string) => {
    switch (step) {
      case 'first':
        setPage(1);
        break;
      case 'prev':
        setPage(curPage > 1 ? curPage - 1 : curPage);
        break;
      case 'next':
        setPage(curPage < maxVal ? curPage + 1 : curPage);
        break;
      case 'last':
        setPage(maxVal);
        break;
      default:
        setPage(curPage);
        break;
    }
  };

  return (
    <div className={styles.paginator}>
      <button
        type="button"
        className="roundBtn"
        onClick={() => calcValue('first')}
        disabled={curPage <= 1}
      >
        &#60;&#60;
      </button>
      <button
        type="button"
        className="roundBtn"
        onClick={() => calcValue('prev')}
        disabled={curPage <= 1}
      >
        &#60;
      </button>
      <p className={styles.paginator__label}>
        <span>{curPage}</span> / <sub>{maxVal}</sub>
      </p>
      <button
        type="button"
        className="roundBtn"
        onClick={() => calcValue('next')}
        disabled={curPage >= maxVal}
      >
        &#62;
      </button>
      <button
        type="button"
        className="roundBtn"
        onClick={() => calcValue('last')}
        disabled={curPage >= maxVal}
      >
        &#62;&#62;
      </button>
    </div>
  );
}

export default Paginator;
