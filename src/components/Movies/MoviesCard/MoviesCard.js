import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BASE_URL } from "../../../utils/MoviesApi";

function MoviesCard({
  movie,
  location,
  savedMovies = JSON.parse(localStorage.getItem('savedMovies')),
  handleLikeMovie,
  handleDeleteLike,
}) {
  const {
    image,
    nameRU,
    duration,
    director,
    trailerLink,
  } = movie;

  const currentPath = location.pathname;
  const currentMovie = savedMovies.find(item => item.id === movie.id);
  const isLikeActive = () => savedMovies.some(item => item.id === movie.id);
  const [isLiked, setIsLiked] = useState(isLikeActive || false);
  
  function getFormattedDuration() {
    const hours = Math.floor(duration / 60);
    const minutes = duration - (60 * hours);

    return `${hours} ч ${minutes} м`;
  }
  const formattedDuration = getFormattedDuration();

  function toggleLike() {
    isLiked ?
      handleDeleteLike(currentMovie._id)
      :
      handleLikeMovie(movie)
    
    setIsLiked(!isLiked);
  }
  function deletelike() {
    handleDeleteLike(currentMovie._id)
  }

  function showLikeButton() {
    return <button
      type="button"
      aria-label="Лайк"
      onClick={toggleLike}
      className={`movies-card__like ${isLiked ? 'movies-card__like_type_liked' : ''} `}
    />
  }
  function showDeleteButton() {
    return <button
      type="button"
      aria-label="Лайк"
      onClick={deletelike}
      className='movies-card__like movies-card__close-icon'
    />
  }

  return (
    <article className="movies-card">
      <Link
        target="blank"
        to={trailerLink}
        className="movies-card__link"
      >
        {currentPath === '/movies' ?
          <img
            alt={director}
            className="movies-card__image"
            src={`${BASE_URL}/${image.url}` || ''}
          />
          :
          <img
            src={image || ''}
            alt={director}
            className="movies-card__image"
          />
        }
      </Link>
      <div className="movies-card__upper">
        <h2 className="movies-card__title"> {nameRU} </h2>
        {currentPath === '/movies' ?
          showLikeButton()
          :
          showDeleteButton()
        }
      </div>
      <span className="movies-card__duration">{formattedDuration}</span>
    </article>
  );
}

export default MoviesCard;