import React from 'react';
import PropTypes from 'prop-types';

const Trailer = ({ trailerKey }) => {
  return (
    <div className="movie-details__play--trailer">
      <iframe 
        width="100%" 
        height="100%" 
        src={`https://www.youtube.com/embed/${trailerKey}?autohide=1&autoplay=1&modestbranding=1`} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </div>
  )
}

Trailer.propTypes = {
  trailerKey: PropTypes.string
}

export default Trailer
