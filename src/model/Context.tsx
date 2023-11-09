import { createContext } from 'react';
import { TSearchContextData } from './types';

type TSearchContext = {
  data: TSearchContextData | null;
  setContextData: (params: object) => void | null;
};

const SearchContext = createContext<TSearchContext>({
  data: null,
  setContextData: () => {},
});

export default SearchContext;
