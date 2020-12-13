import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Loading from '../../components/Loading';

import { FullPageContainer, Container, DetailBlock } from './styles';

const MovieDetails = (props) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      //`https://api.themoviedb.org/3/movie/${props.match.params.movie_id}?api_key=a1279933de606b4374a2c93a1d0127a9`
      await axios.get(`https://api.themoviedb.org/3/movie/${props.match.params.movie_id}?api_key=a1279933de606b4374a2c93a1d0127a9`)
        .then(({ data: response }) => {
        const thumbnailUrl = response.poster_path
          ? `https://image.tmdb.org/t/p/w500/${response.poster_path}`
          : "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";

        const movieLoaded = {
          id: response.id,
          title: response.title,
          description: response.overview,
          thumbnailUrl,
          rating: response.vote_average,
        }

        setMovie(movieLoaded);
        setLoading(false);
        console.log(response);
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
            <DetailBlock className="movie-image">
              <div className="title-and-image">
                <img src={movie.thumbnailUrl} alt={movie.title} />
                <h1>{movie.title}</h1>
              </div>

              <div className="stats">
                <div className="stat-row">
                  <label>Description:</label> <span>{movie.description}</span>
                </div>
                <div className="stat-row">
                  <label>Rating:</label> <span>{movie.rating}</span>
                </div>
              </div>
            </DetailBlock>
          </Container>
        </FullPageContainer>
      )}
    </>
  );
};

export default MovieDetails;