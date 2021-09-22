import React, { useState, useEffect } from 'react';
import tmdb from '../apis/tmdb';
import { GET, BASE_URL } from '../api_config';
import useHandleScroll from '../hooks/useHandleScroll';

const GenresSelector = () => {
  const [open, setOpen] = useState(false)
  const [genres, setGenres] = useState([])
  const [isSticky, setIsSticky] = useState(false);

  const ref = useHandleScroll(() => {
    setIsSticky(false) 
    //set isSticky to true only when window's top border touches
    //the DOM element top border
    setIsSticky(ref.current.getBoundingClientRect().top <= 0)
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
  }

  return (
    <section ref={ref} className={`genres ${isSticky ? 'sticky' : ''}`}>
      <div 
        className={`genres__wrapper ${open ? 'active' : ''}`}
      >
        {genres.map((genre) => {
          return (
            <div key={genre.id} className="genres__genre">
              <h5>{genre.name}</h5>
            </div>
          )
        })}
      </div>

      <i className={`fas fa-caret-${open ? 'up' : 'down'}`} onClick={onArrowDownClick}></i>    
    </section>
  )
}

export default GenresSelector
