import Card from '../Card/Card';
import styles from './CardsContainer.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TProduct } from '../../model/types';
import { setCurItemData } from '../../store/features/curItemSlice';

function CardsContainer() {
  const items: TProduct[] = useAppSelector((state) => state.itemsPerPage.data!);
  // const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  function onClick() {
    // searchParams.delete('product');
    // setSearchParams(searchParams);
    dispatch(setCurItemData(null));
  }
  return (
    <div
      className={styles.cardsContainer}
      role="presentation"
      onClick={onClick}
    >
      {items && items?.length ? (
        items.map((item) => <Card {...item} key={item.id} />)
      ) : (
        <div className={styles.cardsContainer__nofound}>
          Oops! Nothing was found.
        </div>
      )}
    </div>
  );
}

export default CardsContainer;
