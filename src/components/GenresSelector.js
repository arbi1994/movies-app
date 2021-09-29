import React, { useState, useEffect } from 'react';

import tmdb from '../apis/tmdb';
import { GET, BASE_URL } from '../api_config';
import useHandleScroll from '../hooks/useHandleScroll';
import Genre from './Genre';

const GenresSelector = ({ handleCallback, setPage, offsetTop }) => {
  const [open, setOpen] = useState(false)
  const [genres, setGenres] = useState([])
  const [isSticky, setIsSticky] = useState(false);

  const genreRef = useHandleScroll(() => {
    setIsSticky(false) 
    //set isSticky to true only when window's top border touches
    //the DOM element top border
    setIsSticky(genreRef.current.getBoundingClientRect().top <= 0)
  })

  const getGenres = async () => {
    try {
      const {data} = await tmdb.get(`${BASE_URL}${GET.genres}`)
      setGenres(data.genres)
    } catch (error) {
      console.log(error.message)
    }
  } 

  useEffect(() => {
    getGenres()
  }, [])

  const onArrowDownClick = () => {
    setOpen(!open)

    if(!isSticky) genreRef.current.classList.toggle('open') // toggle open class to genres element
  }

  const renderedGenres = genres.map((genre, index) => {
    const handleGenderClick = () => {
      if(genre.id) setPage(1) //reset page to 1

      // Scroll the window up as much as 
      // the offsetTop of cards_wrapper was
      // window.scrollTo({
      //   top: offsetTop - 70,
      //   left: 0,
      //   behavior: 'smooth'
      // });

      document.querySelector("#cards").scrollIntoView({
        block: "start",
        behavior: "smooth"
      })
      
      handleCallback(genre.id)//pass the genre id to parent Card component
    
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
