import ServerComponent from '@/components/ServerComponent';
import LocalComponent from '@/components/LocalComponent';
import { wrapper } from '@/store/store';
import { getProducts, productApi } from '@/model/apiRoot';
import { InferGetServerSidePropsType } from 'next/types';


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('===================HOME START========================');
  console.log(props.data);
  console.log('===================HOME FINISH========================');

  return (
    <>
      <ServerComponent />
      <LocalComponent />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    console.log('===================START========================');
    console.log(context.query);
    console.log('===================FINISH========================');
    const data = await store.dispatch(
      getProducts.initiate({
        search: '',
        limit: 20,
        pageNumber: 1
      })
    );
    await console.log(data);
    await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));
    return {
      props: {
        data,
      },
    };
  }
);
