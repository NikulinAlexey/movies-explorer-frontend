import Preloader from "../../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

import one from '../../../images/movies/2.png';
import two from '../../../images/movies/3.png';
import three from '../../../images/movies/pic__COLOR_pic-1.png';

import four from '../../../images/movies/pic__COLOR_pic-2.png';
import five from '../../../images/movies/pic__COLOR_pic-3.png';
import six from '../../../images/movies/pic__COLOR_pic-4.png';

import seven from '../../../images/movies/pic__COLOR_pic-5.png';
import eight from '../../../images/movies/pic__COLOR_pic-6.png';
import nine from '../../../images/movies/pic__COLOR_pic-7.png';

import ten from '../../../images/movies/pic__COLOR_pic-8.png';
import eleven from '../../../images/movies/pic__COLOR_pic.png';
import twelwe from '../../../images/movies/pic__COLOR_pic-3.png';

function MoviesCardList({
  movies = [
    {
      title: 'Название фильмаНазвание фильмаНазвание фильмаНазвание фильма',
      image: one,
      duraion: '1час 53мин',
    },
    {
      title: 'Название фильма 2',
      image: two,
      duraion: '2час 53мин',
    },
    {
      title: 'Название фильма 3',
      image: three,
      duraion: '3час 53мин',
    },
    {
      title: 'Название фильма 4',
      image: four,
      duraion: '1час 53мин',
    },
    {
      title: 'Название фильма 5',
      image: five,
      duraion: '2час 53мин',
    },
    {
      title: 'Название фильма 6',
      image: six,
      duraion: '3час 53мин',
    },
    {
      title: 'Название фильма 7',
      image: seven,
      duraion: '1час 53мин',
    },
    {
      title: 'Название фильма 8',
      image: eight,
      duraion: '2час 53мин',
    },
    {
      title: 'Название фильма 9',
      image: nine,
      duraion: '3час 53мин',
    },
    {
      title: 'Название фильма 10',
      image: ten,
      duraion: '1час 53мин',
    },
    {
      title: 'Название фильма 11',
      image: eleven,
      duraion: '2час 53мин',
    },
    {
      title: 'Название фильма 12',
      image: twelwe,
      duraion: '3час 53мин',
    }
  ],
  isPreloaderVisible,
}) {
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        <Preloader isPreloaderVisible={isPreloaderVisible} />
        <ul className="movies-list__items">
          {movies.map((movie, i) => (
            <li key={i} className="movies-list__item">
              <MoviesCard
                movie={movie}
              // onCardLike={onCardLike}
              // handleDelete={onCardDeleteClick}
              />
            </li>
          ))}
        </ul>
        <button className="movies-list__button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;