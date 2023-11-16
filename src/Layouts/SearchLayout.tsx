/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { TProduct, TSearchContextData } from '../model/types';
import SearchContext from '../model/Context';
import { getProduct } from '../model/apiRoot';
// Components
import SearchBar from '../Components/SearchBar/SearchBar';
import CardsContainer from '../Components/CardsContainer/CardsContainer';
import Spinner from '../Elements/Spinner/Spinner';
import Paginator from '../Components/Paginator/Paginator';
import ProductCard from '../Components/ProductCard/ProductCard';
import Selector from '../Components/Selector/Selector';
import { setCurItem } from '../features/viewModeSlice';
import { setSearchString } from '../features/searchStringSlice';
import { useGetProductsQuery } from '../model/apiRoots';

function SearchLayout() {
  const dispatch = useAppDispatch();
  const searchString = useAppSelector((state) => state.searchString.value);
  const itemsPerPage = useAppSelector((state) => state.itemsPerPage.count);
  const curItem = useAppSelector((state) => state.viewMode.curItem);

  const [data, setData] = useState<TSearchContextData>({
    items: null,
    pagesCount: 1,
    curPage: 1,
  });

  const queryData = useGetProductsQuery({
    search: searchString,
    limit: itemsPerPage,
    pageNumber: data.curPage - 1,
  }).data;

  const [isLoading] = useState(false);
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
    if(queryData) {
      const items = queryData.products;
      const pagesCount = Math.ceil(queryData.total / itemsPerPage) || 1;
      setContextData({items, pagesCount});
    }
  }, [queryData]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        curPage: 1,
      };
    });
  }, [searchString, itemsPerPage, data.pagesCount]);

  // TO URL
  useEffect(() => {
    const queryString = new URLSearchParams();
    if (searchString) queryString.append('search', searchString);
    if (data.curPage > 1) queryString.append('page', data.curPage.toString());
    if (curItem)
      queryString.append('product', (curItem as TProduct).id.toString());
    setSearchParams(queryString);
  }, [searchString, data.curPage, curItem]);

  useEffect(() => {
    const prod = searchParams.get('product');
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    if (prod && curItem) {
      if (prod !== (curItem as TProduct)?.id.toString()) {
        getProduct(prod).then((res) => {
          if (res.id) dispatch(setCurItem(res || null));
        });
      }
    }
    if (search !== searchString) dispatch(setSearchString(search));
    if (page !== data.curPage.toString())
      setContextData({ curPage: Number(page) || 1 });
    console.log('AAAAAAAAAAA');
  }, [searchParams]);

  // useEffect(() => {
  //   const globId = searchParams.get('product') || '';
  //   if (globId) {
  //     setisLoading(true);
  //     getProduct(globId).then((res) => {
  //       if (res.id) dispatch(setCurItem(res || null));
  //     });
  //     setisLoading(false);
  //   }
  // }, [curItem]);

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
            data={curItem}
            onClose={() => {
              searchParams.delete('product');
              // setSearchParams(searchParams);
              dispatch(setCurItem(null));
            }}
          />
        </div>

        {isLoading ? <Spinner /> : ''}
      </div>
    </SearchContext.Provider>
  );
}

export default SearchLayout;
