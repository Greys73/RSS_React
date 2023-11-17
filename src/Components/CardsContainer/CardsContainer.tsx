import { useSearchParams } from 'react-router-dom';
import Card from '../Card/Card';
import './CardsContainer.css';
import { useAppSelector } from '../../hooks';
import { TProduct } from '../../model/types';

function CardsContainer() {
  const items: TProduct[] = useAppSelector((state) => state.itemsPerPage.data);
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
