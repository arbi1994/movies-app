import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage,trackWindowScroll  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// Hooks
import useViewport from '../../hooks/useViewport';
import { urlEndpoint } from '../../api_config';
// Helpers 
import { decodePathName } from '../../helpers';
// Components
import Rating from '../Rating';

const Card = ({ id, title, imgURL, rating, scrollPosition }) => {
  const [width] = useViewport()
  const breakpoint = 425
  
  return (
    <>
      <Link 
        to={`/movie/${decodePathName(title)}/${id}`} 
        className="card"
      >
        <LazyLoadImage
          alt={title}
          effect="blur"
          height={width <= breakpoint ? '19em' : '31em'}
          width="100%"
          scrollPosition={scrollPosition}
          src={`${urlEndpoint}t/p/${imgURL}`}
        />
        <span className="card__title"><h6>{title}</h6></span>
        <Rating rating={rating} />
      </Link>
    </>
  )
}

export default trackWindowScroll(Card)
