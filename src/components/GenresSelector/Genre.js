import React from 'react';
import { Link } from 'react-router-dom';

const Genre = ({ id, name, handleGenderClick }) => {
  return (
    <Link 
      to={`?genres=${name.split(' ').join('-').toLocaleLowerCase()}`}
      id={id}
      className="genres__genre"
      onClick={handleGenderClick}
    >
      <h5>{name}</h5>
    </Link>
  )
}

export default Genre
