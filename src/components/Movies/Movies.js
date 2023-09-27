import { useEffect, useState } from "react";

import useWindowSizeX from "../../hooks/useWindowSizeX";

import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList";


function Movies({
  message,
  movies,
  location,
  savedMovies,
  messageSetter,
  getSavedMovies,
  handleGetMovies,
  isPreloaderVisible,
  changeLikeMovieStatus,
}) {
  const currentSizeX = useWindowSizeX();
  const lastSearchMoviesResult = JSON.parse(localStorage.getItem('moviesToShow'));
  const [howManyMoviesToShow, setHowManyMoviesToShow] = useState(12);
  const [moviesToShow, setMoviesToShow] = useState(lastSearchMoviesResult || movies.slice(0, howManyMoviesToShow));
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

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
      setMoviesToShow(movies.filter((movie) => isIncludesSearch(movie.nameRU, movie.nameEN, searchInputValue) && movie.duration <= 40))
      :
      setMoviesToShow(movies.filter((movie) => isIncludesSearch(movie.nameRU, movie.nameEN, searchInputValue)))
  }
  function handleSubmit(e, searchInputValue, isCheckboxChecked) {
    e.preventDefault();

    handleGetMovies();

    filterMovies(searchInputValue, isCheckboxChecked);
    console.log('filteredMovies from Movies', filteredMovies)
  }
  
  function handleAddMovies() {
    if (currentSizeX > 1024) {
      setHowManyMoviesToShow(howManyMoviesToShow + 3);

      // if (moviesToShow.length % howManyMoviesToShow === 1) {
      //   setHowManyMoviesToShow(howManyMoviesToShow + 5);
      // } else if (moviesToShow.length % howManyMoviesToShow > 1) {
      //   setHowManyMoviesToShow(howManyMoviesToShow + 4);
      // }
      
    } else {
      setHowManyMoviesToShow(howManyMoviesToShow + 2)
    }
  }

  // Вырезаю из основного массива фильмов нужное кол-во.
  useEffect(() => {
    setMoviesToShow(lastSearchMoviesResult || filteredMovies.slice(0, howManyMoviesToShow));
  }, [howManyMoviesToShow, filteredMovies]);

  useEffect(() => {
    localStorage.setItem('moviesToShow', JSON.stringify(moviesToShow))
  }, [moviesToShow]);

  useEffect(() => {
    getSavedMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isLastSearchMovies = localStorage.getItem('lastSearchMovies') === '';
    if (isLastSearchMovies) {
      messageSetter('')
    }
  }, [])
  
  return (
    <>
      <SearchForm handleSubmit={handleSubmit} filterMovies={filterMovies} />
      <MoviesCardList
        message={message}
        location={location}
        movies={moviesToShow}
        savedMovies={savedMovies}
        messageSetter={messageSetter}
        handleAddMovies={handleAddMovies}
        isAddButtonVisible={isAddButtonVisible}
        isPreloaderVisible={isPreloaderVisible}
        changeLikeMovieStatus={changeLikeMovieStatus}
      />
    </>
  );
}

export default Movies;