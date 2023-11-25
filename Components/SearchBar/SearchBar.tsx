/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchString } from '../../store/features/searchStringSlice';
import * as Type from '../../model/types';
import styles from './SearchBar.module.css';

function SearchBar(props: Type.SearchBarProps) {
  const dispatch = useAppDispatch();
  const searchString = useAppSelector((state) => state.searchString.value);
  const [value, setValue] = useState('');
  const { storageName } = props;

  useEffect(() => {
    if (storageName) {
      const stValue = localStorage.getItem(storageName);
      setValue(searchString || stValue || '');
    }
  }, [storageName]);

  const buttonClick = () => {
    dispatch(setSearchString(value));
    if (storageName) localStorage.setItem(storageName, value.trim());
  };

  const enterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') buttonClick();
  };

  return (
    <div className={styles.enterableInput}>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyUp={enterKeyPress}
        className={styles.enterableInput__input}
        type="search"
        placeholder={props.placeholder}
        value={value}
      />
      <button
        type="button"
        onClick={buttonClick}
        className={styles.enterableInput__button}
      >
        {props.btnLogo || 'SEARCH'}
      </button>
    </div>
  );
}

export default SearchBar;
