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
  handleLikeMovie,
  handleDeleteLike,
  isPreloaderVisible,
  filterSavedMoviesByCheckbox,
}) {
  function handleSubmit() {
    getSavedMovies();
  }

  useEffect(() => {
    getSavedMovies()
  }, []);
  
  return (
    <>
      <SearchForm
        movies={savedMovies}
        handleSubmit={handleSubmit}
        filterMoviesByCheckbox={filterSavedMoviesByCheckbox}
      />
      <MoviesCardList
        message={message}
        location={location}
        movies={savedMovies}
        savedMovies={savedMovies}
        messageSetter={messageSetter}
        handleGetMovies={handleGetMovies}
        handleLikeMovie={handleLikeMovie}
        handleDeleteLike={handleDeleteLike}
        isPreloaderVisible={isPreloaderVisible}
      />
    </>
  );
}

export default SavedMovies;