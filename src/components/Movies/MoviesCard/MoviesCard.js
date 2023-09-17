import { useState, useEffect } from "react";

function MoviesCard({
  movie,
}) {
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }
  return (
    <article className="movies-card">
      <img
        alt={movie.title}
        src={movie.image}
        className="movies-card__image"
      />

      <div className="movies-card__upper">
        <h2 className="movies-card__title"> {movie.title} </h2>
        <div
          type="button"
          aria-label="Лайк"
          onClick={handleLikeClick}
          className={`movies-card__like ${isLiked ? 'movies-card__like_type_liked' : ''}`}
        />
      </div>
      <span className="movies-card__duration">{movie.duraion}</span>
    </article>
  );
}

export default MoviesCard;