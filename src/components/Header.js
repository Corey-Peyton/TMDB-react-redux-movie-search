import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (props) => {
  return (
    <div className="row justify-content-center">    
      <header className="col-12 col-sm-12 text-white bg-dark">
        <h2>{props.text}</h2>
      </header>
    </div>
  )
}

export default Header;