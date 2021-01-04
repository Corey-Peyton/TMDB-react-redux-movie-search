import React from 'react';
import { Link } from 'react-router-dom';
import { MovieBlock as MovieBlockStyled } from './styles';

const MovieBlock = (props) => {
  const { id, image, title } = props.movie;

  return (
    <MovieBlockStyled>
      <Link to={`/movies/${encodeURIComponent(id)}`}>
        <div className="title-and-image">
          <img className="img-fluid" src={image} alt={title} />
          <div className="stat-row">
            <h3>{title}</h3>
          </div>
        </div>
      </Link>
    </MovieBlockStyled>
  );
};

export default MovieBlock;