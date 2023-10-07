import { useEffect, useState } from "react";

import {
  BIG_WINDOW_SIZE,
}
  from "../../utils/constants";
import useWindowSizeX from "../../hooks/useWindowSizeX";

import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({
  message,
  movies,
  location,
  savedMovies,
  messageSetter,
  handleGetMovies,
  handleLikeMovie,
  handleDeleteLike,
  isPreloaderVisible,
  filterMoviesByCheckbox,
  howManyMoviesToShowFirst,
}) {
  const currentSizeX = useWindowSizeX();
  const lastSearchResult = JSON.parse(localStorage.getItem('lastSearchResult')) !== null ?
    JSON.parse(localStorage.getItem('lastSearchResult'))
    :
    [];
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(false);
  const [howManyMoviesToShow, setHowManyMoviesToShow] = useState(howManyMoviesToShowFirst);
  const [moviesToShow, setMoviesToShow] = useState(lastSearchResult || movies.slice(0, howManyMoviesToShowFirst));

  function handleSubmit() {
    handleGetMovies();
  }

  // Определяю сколько добавить фильмов при клике на кнопку "Ещё"
  function handleAddMovies() {
    if (currentSizeX > BIG_WINDOW_SIZE) {
      setHowManyMoviesToShow(howManyMoviesToShow + 3);
    } else {
      setHowManyMoviesToShow(howManyMoviesToShow + 2);
    }
  }

  useEffect(() => {
    setMoviesToShow(movies.slice(0, howManyMoviesToShow));
  }, [movies, howManyMoviesToShow]);

  useEffect(() => {
    messageSetter('');
  }, []);

  //Проверка на видимость кнопки "Ещё"
  useEffect(() => {
    if (movies.length > moviesToShow.length && moviesToShow.length !== 0) {
      setIsAddButtonVisible(true)
    } else {
      setIsAddButtonVisible(false)
    }
  }, [movies, moviesToShow]);

  useEffect(() => {
    localStorage.setItem('lastSearchResult', JSON.stringify(moviesToShow));
  }, [moviesToShow]);

  return (
    <>
      <SearchForm
        movies={movies}
        message={message}
        handleSubmit={handleSubmit}
        filterMoviesByCheckbox={filterMoviesByCheckbox}
      />

      < MoviesCardList
        message={message}
        location={location}
        movies={moviesToShow}
        savedMovies={savedMovies}
        messageSetter={messageSetter}
        handleAddMovies={handleAddMovies}
        handleLikeMovie={handleLikeMovie}
        handleDeleteLike={handleDeleteLike}
        isAddButtonVisible={isAddButtonVisible}
        isPreloaderVisible={isPreloaderVisible}
      />
    </>
  )

}

export default Movies;