import { TProduct } from '../../model/types';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { useRouter } from 'next/router';
import { deleteFromQuery } from '../../utils/deleteFromQuery';

type TProductCardProps = {
  data: TProduct | null;
};

function ProductCard({ data }: TProductCardProps) {
  const router = useRouter();
  const onClose = () => {
    router.push({ query: deleteFromQuery('product') });
  };
  return data !== null ? (
    <div className={styles.product}>
      <button
        type="button"
        className={styles.product__close + ' roundBtn'}
        onClick={onClose}
      >
        X
      </button>
      <div className={styles.product__header}>
        <p>{data.title}</p>
      </div>
      <div className={styles.product__data}>
        <div className={styles.product__data__image}>
          <Image
            src={data.thumbnail}
            alt={data.title}
            width={500}
            height={500}
          />
        </div>
        <div className={styles.product__data__desc}>
          <ul>
            <li>
              <span className={styles.title}>Brand:</span> {data.brand}
            </li>
            <li>
              <span className={styles.title}>Category:</span> {data.category}
            </li>
            <li>
              <span className={styles.title}>Price:</span> {data.price} €
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.product__description}>
        <p>{data.description}</p>
      </div>
    </div>
  ) : (
    ''
  );
}

export default ProductCard;
