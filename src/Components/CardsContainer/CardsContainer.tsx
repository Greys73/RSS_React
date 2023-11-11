import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import Card from '../Card/Card';
import './CardsContainer.css';
import SearchContext from '../../model/Context';

function CardsContainer() {
  const { data } = useContext(SearchContext);
  const items = data?.items;
  const [searchParams, setSearchParams] = useSearchParams();
  function onClick() {
    searchParams.delete('product');
    setSearchParams(searchParams);
  }
  return (
    <div className="cardsContainer" role="presentation" onClick={onClick}>
      {items && items?.length ? (
        items.map((item) => <Card {...item} key={item.id} />)
      ) : (
        <div className="cardsContainer__nofound">Oops! Nothing was found.</div>
      )}
    </div>
  );
}

export default CardsContainer;
