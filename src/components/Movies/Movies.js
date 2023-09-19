import { useEffect } from "react";

import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ isPreloaderVisible, handleSaveMovies }) {
  
  useEffect(() => {
    handleSaveMovies()
  })

  return (
    <>
      <SearchForm filterText='Короткометражки' checkboxName='short-movies' />
      <MoviesCardList
        isPreloaderVisible={isPreloaderVisible}
      />
    </>
  );
}

export default Movies;