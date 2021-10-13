import React from 'react';

const Genres = ({ genres }) => {
  return (
    <div className="details__main--genres">
      <h5>Genres</h5>
      <div className="wrapper">
        {genres?.map((genre, index) => (
          <p key={genre.id}>
            {genres?.length > 1 && index !== genres?.length - 1
              ? `${genre.name}${'\u2002'}${'\u00B7'}${'\u2002'}` 
              : `${genre.name}`}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Genres
