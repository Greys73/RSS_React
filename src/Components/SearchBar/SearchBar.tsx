/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import * as Type from '../../model/types';
import './SearchBar.css';
import { setSearchString } from '../../features/searchStringSlice';
import { useAppDispatch } from '../../hooks';

function SearchBar(props: Type.SearchBarProps) {
  const dispatch = useAppDispatch();
  // const searchString = useAppSelector((state) => state.searchString.value);
  const [value, setValue] = useState('');
  const { storageName } = props;

  useEffect(() => {
    if (storageName) setValue(localStorage.getItem(storageName) || '');
  }, [storageName]);

  const buttonClick = () => {
    dispatch(setSearchString(value));
    if (storageName) localStorage.setItem(storageName, value.trim());
  };

  const enterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') buttonClick();
  };

  return (
    <div className="enterableInput">
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
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
