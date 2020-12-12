import React from 'react';
import { Link } from 'react-router-dom';
import { MovieBlock as MovieBlockStyled } from './styles';

const MovieBlock = (props) => {
  const { id, thumbnailUrl, title } = props.movie;

  return (
    <MovieBlockStyled>
      <div className="thumbnail">
        <img src={thumbnailUrl} alt={title} />
      </div>
      <div className="movie-data">
        <div className="main-info">
          <h3>{title}</h3>
        </div>
        <div className="details">
          <Link to={`/movies/${encodeURIComponent(id)}`}>
            Details <i className="fas fa-info-circle"></i>
          </Link>
        </div>
      </div>
    </MovieBlockStyled>
  );
};

export default MovieBlock;