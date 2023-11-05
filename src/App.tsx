import { useCallback, useState } from 'react';
import EnterableInput from './Components/SearchBar/SearchBar';
import getProducts from './model/apiRoot';
import CardsContainer from './Components/CardsContainer/CardsContainer';
import Spinner from './Elements/Spinner/Spinner';
import Paginator from './Components/Paginator/Paginator';
import ProductCard from './Components/ProductCard/ProductCard';

function App() {
  const [items, setItems] = useState([]);
  const [curItem, setCurItem] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [error, setError] = useState(false);

  const getSearchString = useCallback((value: string) => {
    setisLoading(true);
    setTimeout(() => {
      getProducts({ search: value }).then((res) => setItems(res));
      setisLoading(false);
    }, 300);
  }, []);

  if (error) throw new Error();
  return (
    <div className="main">
      <button
        className="simulaeErrorButton"
        type="button"
        onClick={() => {
          setError(true);
        }}
      >
        Simulate ERROR
      </button>
      <EnterableInput
        btnLogo="🔍"
        onConfirm={getSearchString}
        placeholder="Product name"
        storageName="RSS_React_SearchProductQuery"
      />
      <Paginator
        curPage={curPage}
        maxVal={10}
        setPage={(val) => setCurPage(val)}
      />
      <div className="mainSection">
        <CardsContainer items={items} />
        <ProductCard data={items[curItem]} onClose={() => setCurItem(-1)} />
      </div>

      {isLoading ? <Spinner /> : ''}
    </div>
  );
}

export default App;
