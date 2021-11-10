import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// api configurations
import { POSTER_SIZES } from '../../api_config';
// Hooks
import useTmdbMain from '../../hooks/useTmdbMain';
import useViewport from '../../hooks/useViewport';
import usePersistedState from '../../hooks/usePersistedState';
// Components
import GenresSelector from '../GenresSelector/index';
import Card from './Card';
import CardsHeader from './CardsHeader';
import LoadingSpinner from '../LoadingSpinner';
import NotFound from '../NotFound'

const Cards = () => {
  const { path } = useParams() //get the current URL parameter
  const [
    movies, 
    loading, 
    setIsLoadingMore, 
    setGenre,
    error,
  ] = useTmdbMain()
  const [genreName, setGenreName] = usePersistedState('genre', 'Discover')
  const [width] = useViewport()
  const breakpoint = 768

  const onButtonClick = () => {
    setIsLoadingMore(true)
  }

  const renderedCards = movies.results?.map((card, index) => {
    if(card.poster_path === null || card.poster_path === undefined) return
    if(card.backdrop_path === null || card.backdrop_path === undefined) return

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
    setGenre(id)  
    setGenreName(name)
  }

  useEffect(() => {
    if(error) document.querySelector('header').style.display = 'none'

    return () => document.querySelector('header').style.display = 'block'
  }, [error])

  if(error) return <NotFound />

  return (
    <section className="cards" id="cards" style={{marginTop: path ? '0' : '70px'}}>
      {!path && 
        <GenresSelector 
          handleGenreCallback={handleGenreCallback}
        />
      }

      <CardsHeader genreName={genreName} path={path} />

      <div className="cards__wrapper">
        {loading ? <LoadingSpinner /> : renderedCards}
      </div>

      {loading || movies.page === movies.total_pages
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
