import React from 'react';
import { Link } from 'react-router-dom';

import LoadingSpinner from './LoadingSpinner';
import Rating from './Rating';

const Card = ({ id, title, imgURL, rating, loading }) => {

  return (
    <>
      {loading 
        ? 
          <LoadingSpinner />
        :
          <Link 
            to={`movie/${title.split(' ').join('-').toLowerCase()}/${id}`} 
            className="card"
          >
            <span className="card__title">
              <h6>{title}</h6>
            </span>
            <img src={imgURL}/>
            <Rating rating={rating} />
          </Link>
      }
    </>
  )
}

export default Card
