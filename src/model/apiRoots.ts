import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TProduct } from './types';

type TResponse = {
  products: TProduct[];
  total: number;
  skip: number;
  limit: number;
};

type TGetQuery = {
  search?: string;
  limit?: number;
  pageNumber?: number;
};

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (build) => ({
    getProducts: build.query<TResponse, TGetQuery>({
      query: ({ search = '', limit = 20, pageNumber = 0 }: TGetQuery) => {
        const skip = pageNumber * limit;
        return `products/${
          search ? `/search?q=${search}&` : '?'
        }${`limit=${limit}&skip=${skip}`}`;
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
