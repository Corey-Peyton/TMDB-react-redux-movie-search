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
          <h3>
            <Link to={`/movies/${encodeURIComponent(id)}`}>
              {title}
            </Link>
          </h3>
        </div>
      </div>
    </MovieBlockStyled>
  );
};

export default MovieBlock;