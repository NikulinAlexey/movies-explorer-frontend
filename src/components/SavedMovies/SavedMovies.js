import { useEffect, useState } from 'react';

import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({
  message,
  location,
  savedMovies,
  messageSetter,
  getSavedMovies,
  handleGetMovies,
  isPreloaderVisible,
  changeLikeMovieStatus,
}) {
  const [moviesToShow, setMoviesToShow] = useState(savedMovies);

  function changeSymbolsToLowerCase(movieNameRu, movieNameEn, searchString) {
    const newMovieNameRu = movieNameRu.toLowerCase();
    const newMovieNameEn = movieNameEn.toLowerCase();
    const newSearchString = searchString.toLowerCase();

    return { newMovieNameRu, newMovieNameEn, newSearchString }
  }

  function isIncludesSearch(movieNameRu, movieNameEn, searchString) {
    const { newMovieNameRu, newMovieNameEn, newSearchString } = changeSymbolsToLowerCase(movieNameRu, movieNameEn, searchString);

    const isIncludes = newMovieNameRu.includes(newSearchString) || newMovieNameEn.includes(newSearchString)

    return isIncludes;
  }

  function filterMovies(searchInputValue, isCheckboxChecked) {
    isCheckboxChecked ?
      setMoviesToShow(savedMovies.filter((movie) =>
        isIncludesSearch(movie.nameRU, movie.nameEN, searchInputValue) && movie.duration <= 40))
      :
      setMoviesToShow(savedMovies.filter((movie) =>
        isIncludesSearch(movie.nameRU, movie.nameEN, searchInputValue)))
  }

  function handleSubmit(e, searchInputValue, isCheckboxChecked) {
    e.preventDefault();

    filterMovies(searchInputValue, isCheckboxChecked);
  }

  useEffect(() => {
    setMoviesToShow(savedMovies);
  },[savedMovies])
  
  return (
    <>
      <SearchForm handleSubmit={handleSubmit} filterMovies={filterMovies} />
      <MoviesCardList
        message={message}
        location={location}
        movies={moviesToShow}
        savedMovies={savedMovies}
        messageSetter={messageSetter}
        handleGetMovies={handleGetMovies}
        isPreloaderVisible={isPreloaderVisible}
        changeLikeMovieStatus={changeLikeMovieStatus}
      />
    </>
  );
}

export default SavedMovies;