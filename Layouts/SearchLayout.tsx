/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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

import { useRouter } from 'next/router';
import { TSearchContextData } from '@/model/types';

type TLayoutData = {
  data: TSearchContextData;
};

function SearchLayout(props: TLayoutData) {
  console.log('******SEARCH LAYOUT*********');
  const { items, curItem, searchString, curPage, pagesCount } = props.data;
  const router = useRouter();
  const { pathname, query } = router;
  const { search, product, page } = query;
  console.log(search, product, page);
  return (
    <div className="main">
      <button
        className="simulaeErrorButton"
        type="button"
        onClick={() => {
          throw Error;
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
      <Paginator curPage={curPage} maxVal={pagesCount} />

      <div className="mainSection">
        <CardsContainer />
        <ProductCard
          data={curItem}
          onClose={() => {
            // dispatch(setCurItemData(null));
          }}
        />
      </div>
    </div>
  );
}

export default SearchLayout;
