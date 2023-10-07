import { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  location,
  savedMovies,
  handleAddMovies,
  isAddButtonVisible,
  isPreloaderVisible,
  handleLikeMovie,
  handleDeleteLike,
}) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const isInputEmpty = localStorage.getItem('lastSearchMovies').length === 0 || localStorage.getItem('lastSearchSavedMovies') === null;

    if (isInputEmpty) {
      setMessage('')
    } else if (movies.length === 0) {
      setMessage('Ничего не найдено')
    } else {
      setMessage('')
    }
  }, [location, movies]);
  
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {!isPreloaderVisible && <span className="movies-list__error">{message}</span>}
        <>
          <Preloader isPreloaderVisible={isPreloaderVisible} />
          {!isPreloaderVisible &&
            <>
              <ul className="movies-list__items">
                {movies.map((movie) => (
                  <li key={movie.id} className="movies-list__item">
                    <MoviesCard
                      movie={movie}
                      location={location}
                      savedMovies={savedMovies}
                      handleLikeMovie={handleLikeMovie}
                      handleDeleteLike={handleDeleteLike}
                    />
                  </li>
                ))}
              </ul>
            {isAddButtonVisible && location.pathname === '/movies' &&
                <button
                  onClick={handleAddMovies}
                  className="movies-list__button"
                >
                  Ещё
                </button>}
            </>
          }
        </>

      </div>
    </section>
  );
}

export default MoviesCardList;