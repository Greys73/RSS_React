import { useAppDispatch } from '../../hooks';
import { setCount } from '../../features/itemsPerPageSlice';
import './Selector.css';

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
    dispatch(setCount(value));
  };
  return (
    <div className="selector">
      <span className="selector__header">{header}</span>
      <select className="selector__list" onChange={getValue}>
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
