/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as Type from '../../model/types';
import styles from './SearchBar.module.css';
import { deleteFromQuery } from '../../utils/deleteFromQuery';

function SearchBar(props: Type.SearchBarProps) {
  const { storageName, searchString } = props;
  const router = useRouter();
  const { query } = router;
  const [value, setValue] = useState('');

  useEffect(() => {
    if (storageName) {
      const stValue = localStorage.getItem(storageName);
      setValue(searchString || stValue || '');
    }
  }, [storageName]);

  const buttonClick = () => {
    if (storageName) localStorage.setItem(storageName, value.trim());
    if (value) router.push({ query: { ...query, search: value, page: 1 } });
    else router.push({ query: deleteFromQuery('search') });
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
        placeholder="Product name"
        value={value}
      />
      <button
        type="button"
        onClick={buttonClick}
        className={styles.enterableInput__button}
      >
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
