import React, {useState, useEffect} from 'react';
import { useSpring, animated } from 'react-spring';
import { 
  BASE_IMAGE_URL,
  SECURE_BASE_IMAGE_URL,
  POSTER_SIZES,
} from '../api_config';
import { getYear } from '../helpers';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const SearchWindow = ({ input, searchedData, isLoading, error }) => {

  // set fade animation with useSpring hook
  const fade = useSpring({
    from: {opacity: 0},
    to: {opacity: 1},
    config: { duration: 200}
  })

  /**
   * Rendered searched results
   */
  const renderedResults = searchedData.map(data => {
      const year_released = getYear(data.release_date)
  
      return (
          <div key={data.id} className="search-window__content">
            <div className="search-window__content--poster">
              <img 
                src={`${SECURE_BASE_IMAGE_URL}${POSTER_SIZES[0]}${data.poster_path}`}
                alt={data.original_title}
              />
            </div>
            <div className="search-window__content--details">
              <span className="title">{data.original_title}</span>
              <span className="release-date">{year_released}</span>
            </div>
          </div>
        )
    })
  console.log(error)
  return (
    <animated.div style={fade}>
      <div className="search-window">
        <hr className="search-window__top-line"></hr>
        
        <header className="search-window__header">
          <h2>{input ? `Results for: ${input}` : ''}</h2>
        </header>
        
        {error === true ? <ErrorMessage /> : 
          (
            <div className="search-window__wrapper">

              {isLoading && <LoadingSpinner /> }

              {renderedResults}

            </div>

          )
        }
        
      </div>
    </animated.div>
  )
}

export default SearchWindow
