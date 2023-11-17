/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
// store
import { setItemsData } from '../features/itemsPerPageSlice';
import { setCurItemData } from '../features/curItemSlice';
import { setSearchString } from '../features/searchStringSlice';
import { useGetProductQuery, useGetProductsQuery } from '../model/apiRoots';
// Components
import SearchBar from '../Components/SearchBar/SearchBar';
import CardsContainer from '../Components/CardsContainer/CardsContainer';
import Spinner from '../Elements/Spinner/Spinner';
import Paginator from '../Components/Paginator/Paginator';
import ProductCard from '../Components/ProductCard/ProductCard';
import Selector from '../Components/Selector/Selector';
import { setCurPage, setPagesCount } from '../features/viewModeSlice';

function SearchLayout() {
  const [isLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const searchString = useAppSelector((state) => state.searchString.value);
  const itemsPerPage = useAppSelector((state) => state.itemsPerPage.count);
  const curItem = {
    id: useAppSelector((state) => state.curItem.id),
    data: useAppSelector((state) => state.curItem.data),
  };

  const { pagesCount } = useAppSelector((state) => state.viewMode);
  const { curPage } = useAppSelector((state) => state.viewMode);

  // const [data, setData] = useState<TSearchContextData>({
  //   pagesCount: 1,
  //   curPage: 1,
  // });

  const queryDetailData = useGetProductQuery(curItem.id).data;
  const queryProductsData = useGetProductsQuery({
    search: searchString,
    limit: itemsPerPage,
    pageNumber: curPage - 1,
  }).data;

  useEffect(() => {
    if (queryDetailData) {
      dispatch(setCurItemData(queryDetailData));
    }
  }, [queryDetailData]);

  // const setContextData = (params: object): void => {
  //   setData((prev) => {
  //     return {
  //       ...prev,
  //       ...params,
  //     };
  //   });
  // };

  useEffect(() => {
    if (queryProductsData) {
      dispatch(setItemsData(queryProductsData.products));
      const PagesCount = Math.ceil(queryProductsData.total / itemsPerPage) || 1;
      dispatch(setPagesCount(PagesCount));
    }
  }, [queryProductsData]);

  useEffect(() => {
    dispatch(setCurPage(1));
    // setData((prev) => {
    //   return {
    //     ...prev,
    //     curPage: 1,
    //   };
    // });
  }, [searchString, itemsPerPage, pagesCount]);

  // TO URL
  useEffect(() => {
    const queryString = new URLSearchParams();
    if (searchString) queryString.append('search', searchString);
    if (curPage > 1) queryString.append('page', curPage.toString());
    if (curItem.data && curItem.id) queryString.append('product', curItem.id);
    setTimeout(() => {
      setSearchParams(queryString);
    }, 200);
  }, [searchString, curPage, curItem.data]);

  useEffect(() => {
    // const prod = searchParams.get('product');
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    // if (prod && curItem.data) {
    //   if (prod !== (curItem.data as TProduct)?.id.toString()) {
    //     getProduct(prod).then((res) => {
    //       if (res.id) dispatch(setCurItemData(res || null));
    //     });
    //   }
    // }
    if (search !== searchString) dispatch(setSearchString(search));
    if (page !== curPage.toString()) dispatch(setCurPage(Number(page) || 1));
    // setContextData({ curPage: Number(page) || 1 });
  }, [searchParams]);

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
        placeholder="Product name"
        storageName="RSS_React_SearchProductQuery"
      />
      <Selector header="Quantity per page: " items={['5', '10', '15', '20']} />
      {!isLoading ? <Paginator curPage={curPage} maxVal={pagesCount} /> : ''}

      <div className="mainSection">
        <CardsContainer />
        <ProductCard
          data={curItem.data}
          onClose={() => {
            dispatch(setCurItemData(null));
          }}
        />
      </div>

      {isLoading ? <Spinner /> : ''}
    </div>
  );
}

export default SearchLayout;
