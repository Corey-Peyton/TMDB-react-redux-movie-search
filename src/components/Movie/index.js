import React from 'react';
import { Link } from 'react-router-dom';
import { MovieBlock as MovieBlockStyled } from './styles';

const MovieBlock = ( props ) => {

  const { id, thumbnailUrl, title } = props.movie;

  console.log('movie',props.movie);

  return (
    <MovieBlockStyled>
      <div className="title-and-image">
        <img className="img-fluid" src={thumbnailUrl} alt={title} />
        <div className="stat-row">
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