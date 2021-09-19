import React from 'react';
import Rating from './Rating';

const Card = ({ title, imgURL, rating }) => {
  return (
    <div className="card">
      <span className="card__title">
        <h5 >{title}</h5>
      </span>
      <figure className="card__img">
        <img src={imgURL}/>
      </figure>
      <Rating rating={rating} />
    </div>
  )
}

export default Card
