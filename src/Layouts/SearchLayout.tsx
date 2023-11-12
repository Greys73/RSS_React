import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../Components/SearchBar/SearchBar';
import getProducts, { getProduct } from '../model/apiRoot';
import CardsContainer from '../Components/CardsContainer/CardsContainer';
import Spinner from '../Elements/Spinner/Spinner';
import Paginator from '../Components/Paginator/Paginator';
import ProductCard from '../Components/ProductCard/ProductCard';
import Selector from '../Components/Selector/Selector';
import SearchContext from '../model/Context';
import { TSearchContextData } from '../model/types';

function SearchLayout() {
  const [data, setData] = useState<TSearchContextData>({
    items: null,
    curItem: null,
    searchString: '',
    itemsPerPage: 5,
    pagesCount: 1,
    curPage: 1,
  });

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const setContextData = (params: object): void => {
    setData((prev) => {
      return {
        ...prev,
        ...params,
      };
    });
  };

  useEffect(() => {
    setisLoading(true);
    getProducts({
      search: data.searchString,
      limit: data.itemsPerPage,
      pageNumber: data.curPage - 1,
    }).then((res) => {
      setContextData({
        items: res.products,
        pagesCount: Math.ceil(res.total / data.itemsPerPage) || 1,
      });
      setisLoading(false);
    });
  }, [data.searchString, data.itemsPerPage, data.curPage, data.pagesCount]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        curPage: 1,
      };
    });
  }, [data.searchString, data.itemsPerPage, data.pagesCount]);

  useEffect(() => {
    const product = searchParams.get('product');
    const queryString = new URLSearchParams();
    if (data.searchString) queryString.append('search', data.searchString);
    if (data.curPage > 1) queryString.append('page', data.curPage.toString());
    if (product) {
      queryString.append('product', product);
    } else {
      setContextData({ curItem: null });
    }
    setSearchParams(queryString);
  }, [
    data.searchString,
    data.curItem,
    data.curPage,
    setSearchParams,
    searchParams,
  ]);

  useEffect(() => {
    const globId = searchParams.get('product') || '';
    if (globId) {
      setisLoading(true);
      setTimeout(() => {
        getProduct(globId).then((res) => {
          if (res.id)
            setData((prev) => {
              return {
                ...prev,
                curItem: res || null,
              };
            });
        });
        setisLoading(false);
      }, 200);
    }
  }, [searchParams]);

  if (error) throw new Error();
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SearchContext.Provider value={{ data, setContextData }}>
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
          placeholder="Product name"
          storageName="RSS_React_SearchProductQuery"
        />
        <Selector
          header="Quantity per page: "
          items={['5', '10', '15', '20']}
        />
        {!isLoading ? (
          <Paginator curPage={data.curPage} maxVal={data.pagesCount} />
        ) : (
          ''
        )}

        <div className="mainSection">
          <CardsContainer />
          <ProductCard
            data={data.curItem}
            onClose={() => {
              searchParams.delete('product');
              setSearchParams(searchParams);
              setContextData({ curItem: null });
            }}
          />
        </div>

        {isLoading ? <Spinner /> : ''}
      </div>
    </SearchContext.Provider>
  );
}

export default SearchLayout;
