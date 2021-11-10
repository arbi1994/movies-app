import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Genre = ({ title, id, name, handleGenderClick }) => {
  return (
    <Link 
      to={`?genres=${name.split(' ').join('-').toLocaleLowerCase()}`}
      id={id}
      title={title}
      className="genres__genre"
      onClick={handleGenderClick}
    >
      <h5>{name}</h5>
    </Link>
  )
}

Genre.proptTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  handleGenderClick: PropTypes.func
}

export default Genre
