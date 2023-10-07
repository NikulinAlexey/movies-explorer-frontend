import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({
  movies,
  handleSubmit,
  filterMoviesByCheckbox,
}) {
  const currentLocation = useLocation().pathname;
  
  const [message, setMessage] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const lastSearch = ((currentLocation === '/movies') && (localStorage.getItem('lastSearchMovies')) !== null) ?
    localStorage.getItem('lastSearchMovies')
    :
    '';
  const [searchInputValue, setSearchInputValue] = useState(lastSearch || '');
 
  const getLastCheckboxState = () => {
    if (currentLocation === '/movies') {
      return JSON.parse(localStorage.getItem('lastCheckboxStateMovies'))
    }
  }
  const lastCheckboxState = getLastCheckboxState();
  const [isChecked, setIsChecked] = useState(lastCheckboxState || false);
  
  function onSubmit(e) {
    e.preventDefault();
    if (searchInputValue.length > 0) {
      handleSubmit();
    }
    setIsSubmitClicked(true);
  }

  function handleChangeCheckbox() {
    setIsChecked(!isChecked);
  }
  // записываю в storage значения input-ов
  useEffect(() => {
    if (currentLocation === '/movies') {
      localStorage.setItem('lastSearchMovies', searchInputValue);
      localStorage.setItem('lastCheckboxStateMovies', JSON.stringify(isChecked));
    } else {
      localStorage.setItem('lastSearchSavedMovies', searchInputValue);
      localStorage.setItem('lastCheckboxStateSavedMovies', JSON.stringify(isChecked));

    }
  }, [isChecked, searchInputValue, currentLocation]);

  useEffect(() => {
    if (searchInputValue.length === 0) {
      setMessage('Нужно ввести ключевое слово');
    } else {
      setMessage('')
    }
  }, [searchInputValue]);

  useEffect(() => {
    setIsSubmitClicked(false);
  }, [searchInputValue]);

  useEffect(() => {
    if (movies !== null) {
      filterMoviesByCheckbox(movies, searchInputValue, isChecked);
    }
  }, [isChecked]);
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={onSubmit} noValidate>
          <div className="search-form__input-container">
            <input
              required
              type='text'
              name='search'
              placeholder="Фильм"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              className="search-form__input"
            />
            <button
              type="submit"
              className='search-form__button'
            />
            
            <span className="search-form__error">{isSubmitClicked && message}</span>
          </div>
          <label className="search-form__label">
            <input
              id='checkbox'
              type='checkbox'
              name='checkbox'
              checked={isChecked}
              onChange={handleChangeCheckbox}
              className="search-form__checkbox-input"
            />
            <div className="search-form__pseudo-item" />
            <span className="search-form__filter-text">Короткометражки</span>
          </label>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;