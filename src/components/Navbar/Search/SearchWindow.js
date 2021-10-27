import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// API Config 
import { 
  urlEndpoint,
  POSTER_SIZES,
} from '../../../api_config';
// Helper
import { getYear } from '../../../helpers';
import { decodePathName } from '../../../helpers';
// Hooks
import useViewport from '../../../hooks/useViewport';
// Components
import LoadingSpinner from '../../LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const SearchWindow = ({ 
  setActive,
  setActiveSearch,
  input, 
  formRef,
  searchedData, 
  isLoading, 
  error, 
  page, 
  setPage, 
  totalPages 
}) => {

  const [width] = useViewport()
  const breakpoint = 768 // tablet viewport width

  // set fade animation with useSpring hook
  const fade = useSpring({
    from: {opacity: 0},
    to: {opacity: 1},
    config: { duration: 200}
  })

  /**
   * Changing the page number on scroll event
   * @param {Event object} e 
   */
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if((scrollHeight - scrollTop) - 1 <= clientHeight && page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  /**
   * Change active state to close the window
   */
  const handleResultClick = () => {
    // mobile view
    if(width <= breakpoint) setActiveSearch(false)

    // desktop view
    if(width > breakpoint) {
      setActive(false)
      formRef.current.style.background = 'transparent'
    }
  }

  /**
   * Rendered searched results
   */
  const renderedResults = searchedData?.map(data => {
      const year_released = getYear(data.release_date)

      if(data.poster_path === null || data.poster_path === undefined) return
      if(data.backdrop_path === null || data.backdrop_path === undefined) return

      return (
          <Link 
            to={`/movie/${decodePathName(data.title)}/${data.id}`} 
            style={{ textDecoration: 'none' }}
            onClick={handleResultClick} 
            key={data.id}
          >
            <div key={data.id} className="search-window__content">
              <div className="search-window__content--poster">
                <LazyLoadImage 
                  alt={data.title}
                  effect="blur"
                  src={`${urlEndpoint}t/p/${POSTER_SIZES[0]}${data.poster_path}`}
                />
              </div>
              <div className="search-window__content--details">
                <span className="title">{data.original_title}</span>
                <span className="release-date">{year_released}</span>
              </div>
            </div>
          </Link>
        )
    })

  return (
    <animated.div style={fade}>
      <div className="search-window">
        <hr className="search-window__top-line"></hr>
        
        <header className="search-window__header">
          <h2>{input ? `Results for: ${input}` : ''}</h2>
        </header>
        
        {error === true && input !== ''
          ? <ErrorMessage /> 
          : (
            <div className="search-window__wrapper" onScroll={handleScroll}>
              {input && renderedResults}
            </div>
          )
        }

        {isLoading && <LoadingSpinner />}
        
      </div>
    </animated.div>
  )
}

export default SearchWindow
