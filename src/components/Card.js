import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import Rating from './Rating';

const Card = ({ title, imgURL, rating, loading }) => {
  return (
    <>
      {loading 
        ? 
        <LoadingSpinner />
        :
        <div className="card">
          <span className="card__title">
            <h5 >{title}</h5>
          </span>
          <img src={imgURL}/>
          <Rating rating={rating} />
        </div>
      }
    </>
  )
}

export default Card
