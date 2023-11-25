/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
// store
import {
  setItemsData,
  setItemsIsLoading,
} from '../store/features/itemsPerPageSlice';
import {
  setCurItemData,
  setCurItemIsLoading,
} from '../store/features/curItemSlice';
import { useGetProductQuery, useGetProductsQuery } from '../model/apiRoot';
import { setCurPage, setPagesCount } from '../store/features/viewModeSlice';
// Components
import SearchBar from '../Components/SearchBar/SearchBar';
import CardsContainer from '../Components/CardsContainer/CardsContainer';
import ProductCard from '../Components/ProductCard/ProductCard';
import Paginator from '../Components/Paginator/Paginator';
import Selector from '../Components/Selector/Selector';
import Spinner from '../Elements/Spinner/Spinner';

function SearchLayout() {
  const itemsLoading = useAppSelector((state) => state.itemsPerPage.isLoading);
  const cardLoading = useAppSelector((state) => state.curItem.isLoading);

  const [error, setError] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const searchString = useAppSelector((state) => state.searchString.value);
  const itemsPerPage = useAppSelector((state) => state.itemsPerPage.count);
  const curItem = {
    id: useAppSelector((state) => state.curItem.id),
    data: useAppSelector((state) => state.curItem.data),
  };

  const { pagesCount } = useAppSelector((state) => state.viewMode);
  const { curPage } = useAppSelector((state) => state.viewMode);

  const queryDetail = useGetProductQuery(curItem.id);
  const queryProducts = useGetProductsQuery({
    search: searchString,
    limit: itemsPerPage,
    pageNumber: curPage - 1,
  });

  useEffect(() => {
    if (queryDetail.data) {
      dispatch(setCurItemData(queryDetail.data));
    }
    dispatch(setCurItemIsLoading(queryDetail.isFetching));
  }, [queryDetail]);

  useEffect(() => {
    if (queryProducts.data) {
      dispatch(setItemsData(queryProducts.data.products));
      const PagesCount =
        Math.ceil(queryProducts.data.total / itemsPerPage!) || 1;
      dispatch(setPagesCount(PagesCount));
    }
    dispatch(setItemsIsLoading(queryProducts.isFetching));
  }, [queryProducts]);

  useEffect(() => {
    dispatch(setCurPage(1));
  }, [searchString, itemsPerPage, pagesCount]);

  useEffect(() => {
    const queryString = new URLSearchParams();
    if (searchString) queryString.append('search', searchString);
    if (curPage > 1) queryString.append('page', curPage.toString());
    if (curItem.data && curItem.id) {
      queryString.append('product', curItem.id.toString());
    }
    setTimeout(() => {
      setSearchParams(queryString);
    }, 200);
  }, [searchString, curPage, curItem.data]);

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
      {!itemsLoading ? <Paginator curPage={curPage} maxVal={pagesCount} /> : ''}

      <div className="mainSection">
        <CardsContainer />
        <ProductCard
          data={curItem.data}
          onClose={() => {
            dispatch(setCurItemData(null));
          }}
        />
      </div>
      {itemsLoading || cardLoading ? <Spinner /> : ''}
    </div>
  );
}

export default SearchLayout;
