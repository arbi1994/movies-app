import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ overview }) => {
  return (
    <>
      <div className="details__main--description">
        <h5>Description</h5>
        <p>{overview === '' ? 'Description not yet available' : overview}</p>
      </div>
    </>
  )
}

Description.propTypes = { 
  overview: PropTypes.string
}

export default Description
