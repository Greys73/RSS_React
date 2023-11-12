import { useContext } from 'react';
import './Paginator.css';
import SearchContext from '../../model/Context';

type TPagingtorProps = {
  curPage: number;
  maxVal: number;
};

function Paginator({ curPage, maxVal }: TPagingtorProps) {
  const { setContextData } = useContext(SearchContext);

  const setPage = (val: number) => setContextData({ curPage: val });

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
    <div className="paginator">
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
      <p className="paginator__label">
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
