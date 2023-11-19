import { useSearchParams } from 'react-router-dom';
import Card from '../Card/Card';
import './CardsContainer.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TProduct } from '../../model/types';
import { setCurItemData } from '../../features/curItemSlice';

function CardsContainer() {
  const items: TProduct[] = useAppSelector((state) => state.itemsPerPage.data!);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  function onClick() {
    searchParams.delete('product');
    setSearchParams(searchParams);
    dispatch(setCurItemData(null));
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
