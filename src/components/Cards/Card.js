import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// Hooks
import useViewport from '../../hooks/useViewport';
import { urlEndpoint } from '../../api_config';
// Components
import Rating from '../Rating';

const Card = ({ id, title, imgURL, rating}) => {
  const [width] = useViewport()
  const breakpoint = 425

  return (
    <>
      <Link 
        to={`movie/${title.split(' ').join('-').toLowerCase()}/${id}`} 
        className="card"
      >
        <LazyLoadImage
          alt={title}
          effect="blur"
          height={width <= breakpoint ? '15em' : '31em'}
          minWidth="10em"
          src={`${urlEndpoint}t/p/${imgURL}`}
        />
        <span className="card__title"><h6>{title}</h6></span>
        <Rating rating={rating} />
      </Link>
    </>
  )
}

export default Card
