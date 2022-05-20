import { useState } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSetSearchQuery] = useState('');

  const searchSubmitHandler = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return Notify.warning(`Please enter a search query`);
    }
    onSubmit(searchQuery);
  };
  const changeNameHandler = event => {
    setSetSearchQuery(event.currentTarget.value.toLowerCase());
  };

  return (
    <div className={styles.Searchbar}>
      <form onSubmit={searchSubmitHandler} className={styles.SearchForm}>
        <button type="submit" className={styles.searchBtn}>
          <span className={styles.searchBtnLabel}>Search</span>
        </button>
        <input
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={styles.searchInput}
          value={searchQuery}
          onChange={changeNameHandler}
        />
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
