import { useState, useEffect } from 'react';
import * as Type from '../../model/types';
import './SearchBar.css';

function SearchBar(props: Type.SearchBarProps) {
  const [value, setValue] = useState('');
  const { onConfirm, storageName } = props;

  useEffect(() => {
    if (storageName) {
      const searchString = localStorage.getItem(storageName) || '';
      onConfirm(searchString);
    }
  }, [onConfirm, storageName]);

  function inputChahge(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function buttonClick() {
    if (storageName) localStorage.setItem(storageName, value.trim());
    onConfirm(value);
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
