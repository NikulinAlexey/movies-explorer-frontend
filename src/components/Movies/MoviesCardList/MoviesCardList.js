import { useEffect } from "react";
import Preloader from "../../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  message,
  location,
  savedMovies,
  messageSetter,
  handleAddMovies,
  isAddButtonVisible,
  isPreloaderVisible,
  changeLikeMovieStatus,
}) {
  const isAnyResult = movies.length !== 0;
  const areMoviesVisible = isAnyResult && !isPreloaderVisible;
  
  useEffect(() => {
    isAnyResult ?
      messageSetter('')
      :
      messageSetter('Ничего не найдено')
  }, [isAnyResult, location]);
  
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {message && !isPreloaderVisible && <span className="movies-list__error">{message}</span>}
        <>
          <Preloader isPreloaderVisible={isPreloaderVisible} />
          {areMoviesVisible ?
            <>
              <ul className="movies-list__items">
                {movies.map((movie, i) => (
                  <li key={i} className="movies-list__item">
                    <MoviesCard
                      movie={movie}
                      location={location}
                      savedMovies={savedMovies}
                      changeLikeMovieStatus={changeLikeMovieStatus}
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
            :
            <></>
          }
        </>

      </div>
    </section>
  );
}

export default MoviesCardList;