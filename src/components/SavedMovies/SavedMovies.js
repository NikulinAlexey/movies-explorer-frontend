import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({
  movies,
  isSpinnerVisible,
}) {
  return (
    <>
      <SearchForm filterText='Короткометражки' checkboxName='short-movies' />
      <MoviesCardList
        movies={movies}
        isSpinnerVisible={isSpinnerVisible}
      />
    </>
  );
}

export default SavedMovies;