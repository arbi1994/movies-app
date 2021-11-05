import React, { useState, useEffect } from 'react';
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
  const [open, setOpen] = useState(false)
  const [genres, setGenres] = useState(() => [])
  const [isSticky, setIsSticky] = useState(false);
  const [elementHeight, setElementHeight] = useState(() => null)
  const [width, height] = useViewport()

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

  const onArrowDownClick = () => {
    setOpen(!open)

    if(!isSticky) genreRef.current.classList.toggle('open') // toggle open class on genres element
    // remove open class if open state is set to true and isSticky is false
    if(!isSticky && open) genreRef.current.classList.remove('open')
  }

  useEffect(() => {
    setElementHeight(document.querySelector(".hero").getBoundingClientRect().height) // set Hero element height
  }, [width, height])

  const renderedGenres = genres.map((genre, index) => {
    /**
     * Handle all behaviours on click event
     */
    const handleGenderClick = () => {
      genreRef.current.classList.remove('open') // remove open class which translateY the Genre component

      if(!isSticky) {
        console.log('window scrollIntoView')
        genreRef.current.scrollIntoView({
          block: "start",
          behavior: "smooth"
        })
      }else{
        console.log('window scrollTo')
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
        key={index} 
        id={genre.id} 
        name={genre.name}
        handleGenderClick={handleGenderClick}
      />
    )
  })

  return (
    <section ref={genreRef} className={`genres ${isSticky ? 'sticky' : ''}`}>
      
      <div 
        className={`genres__wrapper ${open ? 'active' : ''}`}
      >
        {renderedGenres}
      </div>

      <i className={`fas fa-caret-${open ? 'up' : 'down'}`} onClick={onArrowDownClick}></i>    
    </section>
  )
}

export default GenresSelector
