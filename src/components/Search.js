import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <div className="row justify-content-center">    
      <form className="col-10 col-sm-8 mt-2 mb-2">
        <input 
          className="form-control"
          type="text" 
          placeholder="Enter movie name, director etc." 
          aria-label="Search"
          onChange={handleSearchInputChanges}
          value={searchValue}
        />
        <input
          className="btn btn-primary mt-2 mb-2"
          type="submit"
          onClick={callSearchFunction}
          value="SEARCH"
        />
      </form>
    </div>
  )
}

export default Search;