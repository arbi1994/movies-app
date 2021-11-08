import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
// tmdb api 
import tmdb from '../../apis/tmdb';
// api config
import { GET, BASE_URL } from '../../api_config';
// hooks
import useHandleScroll from '../../hooks/useHandleScroll';
import useViewport from '../../hooks/useViewport';
// Components
import Genre from './Genre';

const GenresSelector = ({ handleGenreCallback }) => {
  const defaultHeight = "20px";
  const breakpoints = {
    tablet: 768,
    phoneL: 426,
    phone: 325
  }
  const [open, setOpen] = useState(false)
  // The height of the content inside of the accordion
  const [contentHeight, setContentHeight] = useState(defaultHeight);
  // Animations
  const expand = useSpring({
    config: { duration: 300 },
    height: open ? `${contentHeight}px` : defaultHeight
  });
  const spin = useSpring({
    config: { duration: 300 },
    transform: open ? "rotate(540deg)" : "rotate(0deg)"
  });

  const [genres, setGenres] = useState(() => [])
  const [isSticky, setIsSticky] = useState(false);
  const [elementHeight, setElementHeight] = useState(() => 0)
  const [width, height] = useViewport()

  useEffect(() => {
    // Desktop height
    setContentHeight(100)
    // Tablet/iPad height
    if(width === breakpoints.tablet) setContentHeight(150);
    if(width < breakpoints.tablet) setContentHeight(250); // smaller tablet screen
    // Phone height
    if(width <= breakpoints.phoneL) setContentHeight(300); // phone large screen
    if(width <= breakpoints.phone) setContentHeight(400); // phone small screen
    
  }, [width, height]);

  const genreRef = useHandleScroll(() => {
    setIsSticky(false) 
    //set isSticky to true only when window's top border touches
    //the DOM element top border
    setIsSticky(genreRef.current.getBoundingClientRect().top < 1)
  })

  const getGenres = async () => {
    try {
      const {data} = await tmdb.get(`${BASE_URL}${GET.genres}`)
      setGenres(data.genres)
    } catch (error) {
      console.log(error.message)
    }
  } 

  // Get genres on first render
  useEffect(() => {
    getGenres()
  }, [])

  // Hande arrow click event
  const onArrowDownClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setElementHeight(document.querySelector(".hero").getBoundingClientRect().height) // set Hero element height
  }, [width, height])

  const renderedGenres = genres.map(genre => {
    /**
     * Handle all behaviours on click event
     */
    const handleGenderClick = () => {
      genreRef.current.classList.remove('open') // remove open class which translateY the Genre component

      if(!isSticky) {
        genreRef.current.scrollIntoView({
          block: "start",
          behavior: "smooth"
        })
      }else{
        // scroll back to top  
        window.scrollTo({
          top: 0 + elementHeight + 5,
          left: 0,
          behavior: 'smooth'
        });
      }
      
      handleGenreCallback(genre.id, genre.name) //pass the genre id to parent Card component

      setOpen(false) //reset open state
    }

    return (
      <Genre 
        key={genre.id} 
        id={genre.id} 
        name={genre.name}
        handleGenderClick={handleGenderClick}
      />
    )
  })

  return (
    <section ref={genreRef} className={`genres ${isSticky ? 'sticky' : ''}`}>
        
      <animated.div className="genres__wrapper" style={expand}>
        {renderedGenres}
      </animated.div>

      <animated.button style={spin} onClick={onArrowDownClick} className="arrow-down">
        <i className="fas fa-caret-down" /> 
      </animated.button>
        
    </section>
  )
}

export default GenresSelector
