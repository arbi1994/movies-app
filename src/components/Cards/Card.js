import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// Components
import LoadingSpinner from '../LoadingSpinner';
import Rating from '../Rating';

const Card = ({ id, title, imgURL, rating, loading }) => {

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Link 
        to={`movie/${title.split(' ').join('-').toLowerCase()}/${id}`} 
        className="card"
      >
        <LazyLoadImage 
          alt={title}
          effect="blur"
          src={imgURL} 
        />
        <span className="card__title"><h6>{title}</h6></span>
        <Rating rating={rating} />
      </Link>
    </>
  )
}

export default Card
