import './Paginator.css';

type TPagingtorProps = {
  curPage: number;
  maxVal: number;
  setPage: (page: number) => void;
};

function Paginator({ curPage, maxVal, setPage }: TPagingtorProps) {
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
        onClick={() => calcValue('first')}
        disabled={curPage <= 1}
      >
        &#60;&#60;
      </button>
      <button type="button" onClick={() => calcValue('prev')}>
        &#60;
      </button>
      <p>
        <span>{curPage}</span> / <sub>{maxVal}</sub>
      </p>
      <button type="button" onClick={() => calcValue('next')}>
        &#62;
      </button>
      <button
        type="button"
        onClick={() => calcValue('last')}
        disabled={curPage >= maxVal}
      >
        &#62;&#62;
      </button>
    </div>
  );
}

export default Paginator;
