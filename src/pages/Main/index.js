import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toast } from '../../services/sweetAlert';

import { InputSection, SubmitButton, MoviesSection, ClearButton, QueryInput } from './styles';
import MovieBlock from '../../components/Movie';

const DEFAULT_IMG = "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";
const ENDPOINT_IMG = `https://image.tmdb.org/t/p/w500/`;

function getImage(path) {
  if (!path) {
    return DEFAULT_IMG;
  }
  return `${ENDPOINT_IMG}/${path}`;
}

const Main = () => {
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const moviesFromStorage = localStorage.getItem('movies');
    const queryFromStorage = localStorage.getItem('query');
    if (moviesFromStorage && queryFromStorage) {
      setMovies(JSON.parse(moviesFromStorage));
      setQuery(queryFromStorage);
    }
  }, []);

  async function fetchMovies() {
    setLoading(true);
    try {
      await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a1279933de606b4374a2c93a1d0127a9&query=${query}`).then((response) => {
        if (!response.data.total_results) {
          setLoading(false);
          return Toast.fire({
            icon: 'error',
            title: 'No movies found with this query',
          });
        }

        const movies = response.data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            image: getImage(movie.poster_path),
            rating: movie.vote_average,
          };
        });

        setMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
        localStorage.setItem('query', query);
      });
    } catch(error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setQuery(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      setError('You must type something');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    await fetchMovies();
  }

  function handleClear(e) {
    e.preventDefault();
    setQuery('');
    setMovies([]);
    localStorage.removeItem('movies');
    localStorage.removeItem('query');
  }

  const unknownMethod = () => {
    throw new Error("This is unknown method");
  }

  return (
    <>
      <InputSection>
        <div className="container">
          <div className="logo">
            <h1>
              <span className="logo-blue">Movie</span>Finder
            </h1>

            <h2>
              The <span className="logo-blue">right place</span> for you to find movies.
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="label">
              <label htmlFor="movie">Type movie name, director etc...</label>
            </div>

            <div className="input">
              <QueryInput
                onChange={handleChange}
                value={query}
                autoComplete="off"
                type="text"
                id="movie"
                placeholder="Movie or director name"
                width70={query && movies.length}
              />

              {query && (
                <ClearButton type="button" onClick={handleClear}>
                  <i className="fas fa-times"></i>
                </ClearButton>
              )}

              <SubmitButton loading={loading ? 'loading' : undefined} type="submit">
                {loading ? <i className="fas fa-spinner"></i> : <i className="fas fa-search"></i>}
              </SubmitButton>

              <button onClick={unknownMethod}>
                Break everything
              </button>
            </div>

            {error && (
              <div className="error">
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </InputSection>

      <MoviesSection>
        <div className="container">
          {!movies.length ? (
            <div className="no-movies">
              <h1>No movies yet, you need to search for some movies!</h1>
            </div>
          ) : (
              movies.map((movie, index) => <MovieBlock movie={movie} key={index} />)
            )}
        </div>
      </MoviesSection>
    </>
  );
};

export default Main;