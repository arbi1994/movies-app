import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Components
import GenresSelector from '../GenresSelector/index';
import Card from './Card';
import CardsHeader from './CardsHeader';
import LoadingSpinner from '../LoadingSpinner';
// Hooks
import useTmdbMain from '../../hooks/useTmdbMain';
import { POSTER_SIZES } from '../../api_config';
import useViewport from '../../hooks/useViewport';

const Cards = () => {
  const { path } = useParams() //get the current URL parameter
  const [page, setPage] = useState(1)
  const [getData, movies, loading] = useTmdbMain()
  const [genreID, setGenreID] = useState(null)
  const [genreName, setGenreName] = useState('Discover')
  const [width] = useViewport()
  const breakpoint = 768

  useEffect(() => {
    getData(page, genreID) 
  }, [path, page, genreID])

  const onButtonClick = () => {
    setPage((prev) => prev + 1)
  } 

  const renderedCards = movies?.map((card, index) => {
    return (
      <Card
        key={card.id} 
        id={card.id} 
        title={card.title} 
        imgURL={`${POSTER_SIZES[width <= breakpoint ? 2 : 4]}${card.poster_path}`}
        rating={card.vote_average}
      />
    )
  })

  /**
   * A callback function to get the genre Id 
   * from GenresSelector component
   * @param {Number} id 
   */
  const handleGenreCallback = (id, name) => {
    setGenreID(id)
    setGenreName(name)
  }

  return (
    <section className="cards" id="cards">
      {!path && 
        <GenresSelector 
          handleGenreCallback={handleGenreCallback}
          setPage={setPage}
        />
      }

      <CardsHeader genreName={genreName}/>

      <div className="cards__wrapper">
        {loading ? <LoadingSpinner /> : renderedCards}
      </div>

      {loading 
        ? null 
        : <button 
            className="loadMore-btn" 
            onClick={onButtonClick}
          >Load more</button>
      }      
    </section>
  )
}

export default Cards
