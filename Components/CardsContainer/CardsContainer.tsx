import Card from '../Card/Card';
import styles from './CardsContainer.module.css';
import { TProduct } from '../../model/types';
import { useRouter } from 'next/router';
import { deleteFromQuery } from '@/utils/deleteFromQuery';

function CardsContainer(props: { data: TProduct[] | null }) {
  const items = props.data;
  const router = useRouter();
  function onClick() {
    router.push({ query: deleteFromQuery('product') });
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
