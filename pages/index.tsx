import { wrapper } from '@/store/store';
import { getProduct, getProducts, productApi } from '@/model/apiRoot';
import { InferGetServerSidePropsType } from 'next/types';
import SearchLayout from '@/Layouts/SearchLayout';
import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';
import {
  setItemsCount,
  setItemsData,
} from '@/store/features/itemsPerPageSlice';
import { setCurPage, setPagesCount } from '@/store/features/viewModeSlice';
import { setCurItemData } from '@/store/features/curItemSlice';
import { TSearchContextData } from '@/model/types';

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const data: TSearchContextData = props.data;
  return <SearchLayout data={data} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search, product, page, limit } = context.query;
    const itemsPerPage = store.getState().itemsPerPage.count;

    const queryProducts = await store.dispatch(
      getProducts.initiate({
        search: search?.toString() || '',
        limit: Number(limit) || 5,
        pageNumber: Number(page) - 1 || 1,
      })
    );
    if (queryProducts.data) {
      store.dispatch(setItemsData(queryProducts.data.products));
      const PagesCount =
        Math.ceil(queryProducts.data.total / itemsPerPage!) || 1;
      store.dispatch(setPagesCount(Number(PagesCount)));
      store.dispatch(setCurPage(Number(page)));
      store.dispatch(setItemsCount(Number(limit)));
    }

    if (product) {
      const queryDetail = await store.dispatch(
        getProduct.initiate(Number(product))
      );
      if (queryDetail.data) {
        store.dispatch(setCurItemData(queryDetail.data));
      }
    }
    await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));
    return {
      props: {
        data: {
          items: store.getState().itemsPerPage.data || null,
          curItem: store.getState().curItem.data || null,
          pagesCount: store.getState().viewMode.pagesCount,
          searchString: store.getState().searchString.value,
          itemsPerPage: store.getState().itemsPerPage.count || 5,
          curPage: store.getState().viewMode.curPage || 1,
        },
      },
    };
  }
);
