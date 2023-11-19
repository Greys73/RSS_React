export type SearchBarProps = {
  placeholder?: string;
  btnLogo?: string;
  storageName?: string;
};

export type SearchState = {
  value: string;
};

export type TSearchContextData = {
  items: TProduct[] | null;
  curItem: TProduct | null;
  pagesCount: number;
  searchString: string;
  itemsPerPage: number;
  curPage: number;
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

export type TApiData = {
  products: object[];
  total: number;
  skip: number;
  limit: number;
};
