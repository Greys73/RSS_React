import { useCallback, useState } from 'react';
import EnterableInput from './Components/SearchBar/SearchBar';
import getProducts from './model/apiRoot';
import CardsContainer from './Components/CardsContainer/CardsContainer';
import Spinner from './Elements/Spinner/Spinner';

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false);

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
        placeholder="Character name"
        storageName="RSS_React_SearchProductQuery"
      />
      <CardsContainer items={items} />
      {isLoading ? <Spinner /> : ''}
    </div>
  );
}

export default App;
