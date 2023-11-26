import SearchBar from '../Components/SearchBar/SearchBar';
import CardsContainer from '../Components/CardsContainer/CardsContainer';
import ProductCard from '../Components/ProductCard/ProductCard';
import Paginator from '../Components/Paginator/Paginator';
import Selector from '../Components/Selector/Selector';
import { TSearchContextData } from '@/model/types';

type TLayoutData = {
  data: TSearchContextData;
};

function SearchLayout(props: TLayoutData) {
  const { items, curItem, searchString, curPage, pagesCount } = props.data;

  return (
    <div className="main">
      <button
        className="simulaeErrorButton"
        type="button"
        onClick={() => {
          throw new Error('test error');
        }}
      >
        Simulate ERROR
      </button>
      <SearchBar
        searchString={searchString}
        storageName="RSS_React_SearchProductQuery"
      />
      <Selector header="Quantity per page: " items={['5', '10', '15', '20']} />
      <Paginator curPage={curPage} maxVal={pagesCount} />

      <div className="mainSection">
        <CardsContainer data={items} />
        <ProductCard data={curItem} />
      </div>
    </div>
  );
}

export default SearchLayout;
