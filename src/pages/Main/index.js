import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { InputSection, SubmitButton, MoviesSection, ClearButton, QueryInput } from './styles';
import MovieBlock from '../../components/Movie';

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
    await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a1279933de606b4374a2c93a1d0127a9&query=${query}`).then((response) => {
      if(!response.data.total_results) {
        setLoading(false);
        setError('Error occurred!');
      }

      const movies = response.data.results.map((movie) => {
        const thumbnailUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";

        return {
          id: movie.id,
          title: movie.title,
          thumbnailUrl,
        };
      });

      setMovies(movies);
      setLoading(false);
      localStorage.setItem('movies', JSON.stringify(movies));
      localStorage.setItem('query', query);
      console.log(response);
    });
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