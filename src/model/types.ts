export type SearchBarProps = {
  placeholder?: string;
  btnLogo?: string;
  storageName?: string;
};

export type SearchState = {
  value: string;
};

export type TProduct = {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: string;
  thumbnail: string;
};

export type TSearchContextData = {
  pagesCount: number;
  curPage: number;
};

export type TApiData = {
  products: object[];
  total: number;
  skip: number;
  limit: number;
};
