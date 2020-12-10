import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DEFAULT_PLACEHOLDER_IMAGE = "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";

const MovieDetail = ({ movie }) => {
  const img_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const poster = movie.poster_path === null ? DEFAULT_PLACEHOLDER_IMAGE : img_path;
  if (movie != null) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-3">
            <img className="img-fluid" src={poster} alt={movie.title} />
          </div>
          <div className="col-12 col-sm-9">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Genres: {movie.genres['name']}</p>
          </div>
          <div className="col-12 col-sm-9">
            <p className="col-3 col-sm-3">{movie.release_date}</p>
            <p className="col-3 col-sm-3">{movie.runtime}</p>
            <p className="col-3 col-sm-3">{movie.budget}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetail;