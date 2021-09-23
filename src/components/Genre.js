import React from 'react';

const Genre = ({ id, name, handleGenderClick }) => {
  return (
    <div 
      id={id}
      className="genres__genre"
      onClick={handleGenderClick}
    >
      <h5>{name}</h5>
    </div>
  )
}

export default Genre
