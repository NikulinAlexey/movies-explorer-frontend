import { useState, useEffect } from "react";

import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ isSpinnerVisible, handleSaveMovies }) {
  
  useEffect(() => {
    handleSaveMovies()
  })

  return (
    <>
      <SearchForm filterText='Короткометражки' checkboxName='short-movies' />
      <MoviesCardList
        isSpinnerVisible={isSpinnerVisible}
      />
    </>
  );
}

export default Movies;