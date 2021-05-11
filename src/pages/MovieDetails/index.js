import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Loading from '../../components/Loading';
import { FullPageContainer, Container, MoviesSection } from './styles';
import MovieBlock from '../../components/Movie';

const DEFAULT_IMG = "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";
const ENDPOINT_IMG = `https://image.tmdb.org/t/p/w500/`;

function getImage(path) {
  if(!path) {
    return DEFAULT_IMG;
  }
  return `${ENDPOINT_IMG}/${path}`;
}

const MovieDetails = (props) => {

  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    function fetchMovie() {
      setLoading(true);
      try {
        axios.get(`https://api.themoviedb.org/3/movie/${props.match.params.movie_id}?api_key=a1279933de606b4374a2c93a1d0127a9&append_to_response=videos`)
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
          });
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    async function fetchRecommendations() {
      setLoading(true);
      try {
        await axios.get(`https://api.themoviedb.org/3/movie/${props.match.params.movie_id}/recommendations?api_key=a1279933de606b4374a2c93a1d0127a9&language=en-US&page=1`)
          .then((res) => {

            const recommendationLoaded = res.data.results.map((recommendation) => ({
              ...recommendation,
              image: getImage(recommendation.poster_path)
            }))

            setRecommendations(recommendationLoaded);
          })
      } catch (error) {
        setError('Something went wrong while fetching recommendations!');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
    fetchRecommendations();
  }, [props.match.params.movie_id]);

  if (error) {
    return (
      <FullPageContainer>
        <Container>
          <div><h5>{error}</h5></div>
        </Container>
      </FullPageContainer>
    )
  } else {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
            <FullPageContainer>
              <Link className="back-link" to='/'>
                <i className="fas fa-arrow-left"></i> Back
              </Link>
              {/* <div>
                {
                  trailers.length === 0 ? (
                    <div>No Trailers</div>
                  ) : (
                      trailers.map((trailer) => (
                        <video controls
                          key={trailer.id}
                          src={`https://www.youtube.com/watch?v=${trailer.key}`}>
  
                        </video>
                      ))
                    )
                }
              </div> */}
              <Container>
                <div className="image">
                  <img src={movie.thumbnailUrl} alt={movie.title} />
                </div>
                <div className="stats">
                  <div className="stat-row">
                    <h1>{movie.title}</h1>
                    <p>{movie.id}</p>
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
              <MoviesSection>
                <div className="container">
                  {!recommendations.length ? (
                    <div className="no-movies">
                      <h1>No movies yet, you need to search for some movies!</h1>
                    </div>
                  ) : (
                      recommendations.map((movie, index) => <MovieBlock movie={movie} key={index} />)
                    )}
                </div>
              </MoviesSection>
            </FullPageContainer>
          )}
      </>
    );
  }
};

export default MovieDetails;