import { useState } from "react";
import { SHORT_MOVIES_DURATION } from "../utils/constants";

export default function useFilterMovies() {
  const [filteredMovies, setFilteredMovies] = useState([]);

  function changeSymbolsToLowerCase(movieNameRu, movieNameEn, searchString) {
    const newMovieNameRu = movieNameRu.toLowerCase();
    const newMovieNameEn = movieNameEn.toLowerCase();
    const newSearchString = searchString.toLowerCase();

    return { newMovieNameRu, newMovieNameEn, newSearchString }
  }
  function doesIncludeSearch(movieNameRu, movieNameEn, searchString) {
    const { newMovieNameRu, newMovieNameEn, newSearchString } = changeSymbolsToLowerCase(movieNameRu, movieNameEn, searchString);

    const isIncludes = newMovieNameRu.includes(newSearchString) || newMovieNameEn.includes(newSearchString)

    return isIncludes;
  }
  function handleFilterMovies(movies, textInputValue, isChecked) {

    if (isChecked) {
      setFilteredMovies(movies.filter((movie) =>
        doesIncludeSearch(movie.nameRU, movie.nameEN, textInputValue) && movie.duration <= SHORT_MOVIES_DURATION))
    } else {
      setFilteredMovies(movies.filter((movie) =>
        doesIncludeSearch(movie.nameRU, movie.nameEN, textInputValue)))
    }
    return filteredMovies;
  }

  return handleFilterMovies;
}