function SearchForm({
  checkboxName,
  filterText,
})
{
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <div className="search-form__input-container">
            <input
              required
              placeholder="Фильм"
              className="search-form__input"
            />
            <button className="search-form__button" type="submit" />
          </div>
          <label className="search-form__label">
            <input
              type="checkbox"
              id={checkboxName}
              name={checkboxName}
              value={checkboxName}
              className="search-form__checkbox-input"
            />
            <div className="search-form__pseudo-item"></div>
            <span className="search-form__filter-text">{filterText}</span>
          </label>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;