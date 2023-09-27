import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({
  filterMovies,
  handleSubmit,
}) {
  
  const currentLocation = useLocation().pathname;
  const lastSearch = (currentLocation === '/movies') ?
    localStorage.getItem('lastSearchMovies')
    :
    localStorage.getItem('lastSearchSavedMovies');
  
  const lastCheckboxState = (currentLocation === '/movies') ?
    JSON.parse(localStorage.getItem('lastCheckboxStateMovies'))
    :
    JSON.parse(localStorage.getItem('lastCheckboxStateSavedMovies'))
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [searchInputValue, setSearchInputValue] = useState(lastSearch || '');
  const [isChecked, setIsChecked] = useState(lastCheckboxState || false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  
  function handleChangeSearchInputValue(e) {
    setSearchInputValue(e.target.value);

    setIsFormValid(e.target.closest("form").checkValidity());
    setValidationMessage(e.target.validationMessage)
  }

  function handleChangeCheckbox() {
    setIsChecked(!isChecked);
  }

  function onSubmit(e) {
    setIsSubmitClicked(true);
    handleSubmit(e, searchInputValue, isChecked);
  }

  useEffect(() => {
    currentLocation === '/movies' ? (
      localStorage.setItem('lastCheckboxStateMovies', isChecked)
    )
      :
      localStorage.setItem('lastCheckboxStateSavedMovies', isChecked)
    
    currentLocation === '/movies' ?
      localStorage.setItem('lastSearchMovies', searchInputValue)
      :
      localStorage.setItem('lastSearchSavedMovies', searchInputValue)
  }, [isChecked, searchInputValue, currentLocation]);
  
  useEffect(() => {
    filterMovies(searchInputValue, isChecked)
  }, [isChecked]);

  useEffect(() => {
    setIsSubmitClicked(false)
  }, [searchInputValue])
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={onSubmit} noValidate>
          <div className="search-form__input-container">
            <input
              required
              type='text'
              name='search'
              minLength={2}
              maxLength={50}
              placeholder="Фильм"
              value={searchInputValue}
              onChange={handleChangeSearchInputValue}
              className="search-form__input"
            />
            {isFormValid ? 
              <button
                type="submit"
                className='search-form__button'
              />
              :
              <button
                disabled
                type="submit"
                className='search-form__button search-form__button_type_disabled'
              />
            }
            
            <span className="search-form__error">{isSubmitClicked && validationMessage}</span>
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