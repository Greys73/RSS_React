import { useState, useEffect, useContext } from 'react';
import * as Type from '../../model/types';
import './SearchBar.css';
import SearchContext from '../../model/Context';

function SearchBar(props: Type.SearchBarProps) {
  const [value, setValue] = useState('');
  const { data, setContextData } = useContext(SearchContext);
  const { storageName } = props;

  useEffect(() => {
    if (storageName) setValue(localStorage.getItem(storageName) || '');
  }, [data, storageName]);

  function inputChahge(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function buttonClick() {
    if (storageName) localStorage.setItem(storageName, value.trim());
    setContextData({ searchString: value });
  }

  function enterKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') buttonClick();
  }

  return (
    <div className="enterableInput">
      <input
        onChange={inputChahge}
        onKeyUp={enterKeyPress}
        className="enterableInput__input"
        type="search"
        placeholder={props.placeholder}
        value={value}
      />
      <button
        type="button"
        onClick={buttonClick}
        className="enterableInput__button"
      >
        {props.btnLogo || 'SEARCH'}
      </button>
    </div>
  );
}

export default SearchBar;
