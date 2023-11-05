import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../Components/SearchBar/SearchBar';
import getProducts, { getProduct } from '../model/apiRoot';
import CardsContainer from '../Components/CardsContainer/CardsContainer';
import Spinner from '../Elements/Spinner/Spinner';
import Paginator from '../Components/Paginator/Paginator';
import ProductCard from '../Components/ProductCard/ProductCard';
import Selector from '../Components/Selector/Selector';

function SearchLayout() {
  const [items, setItems] = useState([]);
  const [curItem, setCurItem] = useState(null);
  const [pagesCount, setPagesCount] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [curPage, setCurPage] = useState(1);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const globId = searchParams.get('product') || '';
    if (globId) {
      setisLoading(true);
      setTimeout(() => {
        getProduct(globId).then((res) => {
          if (res.id) setCurItem(res || null);
        });
        setisLoading(false);
      }, 200);
    } else {
      setCurItem(null);
    }
  }, [searchParams]);

  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      getProducts({
        search: searchString,
        limit: itemsPerPage,
        pageNumber: curPage - 1,
      }).then((res) => {
        setPagesCount(Math.ceil(res.total / itemsPerPage) || 1);
        setItems(res.products);
        setisLoading(false);
      });
    }, 200);
  }, [searchString, itemsPerPage, curPage, pagesCount]);

  useEffect(() => {
    setCurPage(1);
  }, [searchString, itemsPerPage, pagesCount]);

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
      <SearchBar
        btnLogo="🔍"
        onConfirm={(val) => setSearchString(val)}
        placeholder="Product name"
        storageName="RSS_React_SearchProductQuery"
      />
      <Selector
        header="Quantity per page: "
        items={['5', '10', '15', '20']}
        onSelect={(val) => setItemsPerPage(parseInt(val, 10))}
      />
      {!isLoading ? (
        <Paginator
          curPage={curPage}
          maxVal={pagesCount}
          setPage={(val) => setCurPage(val)}
        />
      ) : (
        ''
      )}

      <div className="mainSection">
        <CardsContainer items={items} />
        <ProductCard
          data={curItem}
          onClose={() => {
            searchParams.delete('product');
            setSearchParams(searchParams);
            setCurItem(null);
          }}
        />
      </div>

      {isLoading ? <Spinner /> : ''}
    </div>
  );
}

export default SearchLayout;
