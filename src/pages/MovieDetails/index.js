import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Loading from '../../components/Loading';

import { FullPageContainer, Container } from './styles';

const MovieDetails = (props) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      await axios.get(`https://api.themoviedb.org/3/movie/${props.match.params.movie_id}?api_key=a1279933de606b4374a2c93a1d0127a9`)
        .then(({ data: response }) => {
        const thumbnailUrl = response.poster_path
          ? `https://image.tmdb.org/t/p/w500/${response.poster_path}`
          : "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";

        let genreList = [];
        if (response.genres) {
          response.genres.map(item => {
            return genreList.push(item.name);
          })
        };

        const movieLoaded = {
          id: response.id,
          title: response.title,
          description: response.overview,
          thumbnailUrl,
          rating: response.vote_average,
          tagline: response.tagline,
          genres: genreList.join(', '),
        }
        setMovie(movieLoaded);
        setLoading(false);
      });
    }

    fetchMovie();
  }, [props.match.params.movie_id]);

  return (
    <>    
      {loading ? (
        <Loading />
      ) : (
        <FullPageContainer>
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back
          </Link>
          <Container>            
            <div className="image">
              <img src={movie.thumbnailUrl} alt={movie.title} />
            </div>
            <div className="stats">
              <div className="stat-row">
                <h1>{movie.title}</h1>
              </div>
              <div className="stat-row">
                <h5>{movie.tagline}</h5>
              </div>
              <div className="stat-row">
                <span><p>{movie.description}</p></span>
              </div>
              <div className="stat-row">
                <label><strong className="strong">Rating:</strong></label> 
                <span className="rating-and-genre"> {movie.rating}</span>
              </div>
              <div className="stat-row">
                <label><strong className="strong">Genres:</strong></label> 
                <span className="rating-and-genre"> {movie.genres}</span>
              </div>
            </div>
          </Container>
        </FullPageContainer>
      )}
    </>
  );
};

export default MovieDetails;