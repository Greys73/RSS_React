import styles from './Card.module.css';
import * as Type from '../../model/types';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Card(props: Type.TProduct) {
  const { id, title, brand, category, thumbnail, price } = props;

  const router = useRouter();
  const { query } = router;

  function onClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    router.push({ query: { ...query, product: id } });
  }

  return (
    <div className={styles.card} role="presentation" onClick={onClick}>
      <div className={styles.card__header}>
        <p>{title}</p>
      </div>
      <div className={styles.card__data}>
        <div className={styles.card__data__image}>
          <Image
            src={thumbnail}
            alt={title}
            width={500}
            height={500}
            priority={true}
          />
        </div>
        <div className={styles.card__data__desc}>
          <ul>
            <li>
              <span className={styles.title}>Brand:</span> {brand}
            </li>
            <li>
              <span className={styles.title}>Category:</span> {category}
            </li>
            <li>
              <span className={styles.title}>Price:</span> {price} €
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
