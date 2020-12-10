import React, { useReducer, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Search from './Search';
import { Link } from 'react-router-dom';
import { initialState, reducer } from '../store/reducer';
import axios from 'axios';

const MOVIE_API_URL = "https://api.themoviedb.org/3/search/movie?api_key=a1279933de606b4374a2c93a1d0127a9&query=popular";
const DEFAULT_PLACEHOLDER_IMAGE = "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";

const Movie = ({ movie }) => {
  
  const img_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const poster = movie.poster_path === null ? DEFAULT_PLACEHOLDER_IMAGE : img_path;

  return (
    <div className="col-12 col-sm-3 border border-primary">
      <Link to={`/movies/${movie.id}`} >
        <img className="img-fluid" src={poster} width="200" alt={movie.original_title} />
        <h2>{ movie.original_title.slice(0, 13) }</h2>
      </Link>
    </div>
  )
};

const MovieList = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonResponse.data.results
      });
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    });

    axios(`https://api.themoviedb.org/3/search/movie?api_key=a1279933de606b4374a2c93a1d0127a9&query=${searchValue}`).then(
      jsonResponse => {
        if (jsonResponse.data.total_results >= 1) {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.data.results
          });
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            payload: jsonResponse.data.Error
          });
        }
      });
  }

  const { movies, errorMessage, loading } = state;

  const retrievedMovies = 
    state.loading && !state.errorMessage ? (
      <span className="justify-content-center">loading...</span>
    ) : state.errorMessage ? (
      <div className="text-danger">{state.errorMessage}</div>
    ) : (
      state.movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    )

  return (
    <div className="App">
      <Header text="Muvies" />
      <Search search={search} />

        <div className="container">
          <h2 className="row justify-content-center mb-3 ">Movies List</h2>
          <hr />
          {retrievedMovies}
        </div>
    </div>
  );
}

export default MovieList;