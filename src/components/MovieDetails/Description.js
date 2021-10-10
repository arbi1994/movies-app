import React from 'react';

const Description = ({ overview }) => {
  return (
    <>
      <div className="details__main--description">
        <h5>Description</h5>
        <p>{overview}</p>
      </div>
    </>
  )
}

export default Description
