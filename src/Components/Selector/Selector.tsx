import './Selector.css';

type TSelector = {
  header: string;
  items: string[];
  onSelect: (value: string) => void;
};

function Selector({ header, items = ['10', '20', '30'], onSelect }: TSelector) {
  const getValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const select = e.target;
    const index = select.selectedIndex;
    const { value } = select.options[index];
    onSelect(value);
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
