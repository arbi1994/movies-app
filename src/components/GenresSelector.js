import React, { useState, useEffect } from 'react';
import tmdb from '../apis/tmdb';
import { GET, BASE_URL } from '../api_config';

const genres = [
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
  {genre: 'Action'},
]

const genreArr = genres.map(genre => genre.genre)
console.log(genreArr)

const GenresSelector = () => {
  const [open, setOpen] = useState(false)
  const [genres, setGenres] = useState([])

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
    <section className="genres">
      <div 
        className={`genres__wrapper ${open ? 'active' : ''}`}
      >
        {genres.map((genre) => {
          console.log(genre)
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
