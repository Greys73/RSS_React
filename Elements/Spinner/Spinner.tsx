import styles from './Spinner.module.css';
import loadImg from '../../public/spinner.gif';
import Image from 'next/image';

function Spinner() {
  return (
    <div className={styles.loader}>
      <Image
        className={styles.loader__image}
        src={loadImg}
        alt="Loading..."
        width={500}
        height={500}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

export default Spinner;
