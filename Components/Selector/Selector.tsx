import { useAppDispatch } from '../../hooks';
import { setItemsCount } from '../../store/features/itemsPerPageSlice';
import styles from './Selector.module.css';

type TSelector = {
  header: string;
  items: string[];
};

function Selector({ header, items = ['10', '20', '30'] }: TSelector) {
  const dispatch = useAppDispatch();
  const getValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const select = e.target;
    const index = select.selectedIndex;
    const { value } = select.options[index];
    dispatch(setItemsCount(value));
  };
  return (
    <div className={styles.selector}>
      <span className={styles.selector__header}>{header}</span>
      <select className={styles.selector__list} onChange={getValue}>
        {items.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
