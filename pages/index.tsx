import { wrapper } from '@/store/store';
import { getProduct, getProducts, productApi } from '@/model/apiRoot';
import { InferGetServerSidePropsType } from 'next/types';
import SearchLayout from '@/Layouts/SearchLayout';
import { setItemsData } from '@/store/features/itemsPerPageSlice';
import { setPagesCount } from '@/store/features/viewModeSlice';
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
    const { search, product, page } = context.query;
    const itemsPerPage = store.getState().itemsPerPage.count;

    const queryProducts = await store.dispatch(
      getProducts.initiate({
        search: search?.toString() || '',
        limit: itemsPerPage || 20,
        pageNumber: Number(page) || 1,
      })
    );
    if (queryProducts.data) {
      store.dispatch(setItemsData(queryProducts.data.products));
      const PagesCount =
        Math.ceil(queryProducts.data.total / itemsPerPage!) || 1;
      store.dispatch(setPagesCount(PagesCount));
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
          itemsPerPage: store.getState().itemsPerPage.count || 20,
          curPage: store.getState().viewMode.curPage,
        },
      },
    };
  }
);
