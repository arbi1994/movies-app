import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import GenresSelector from './GenresSelector';
import Card from './Card';
import CardsHeader from './CardsHeader';

import useTmdbMain from '../hooks/useTmdbMain';
import useHandleScroll from '../hooks/useHandleScroll';
import { GET, BASE_IMAGE_URL, POSTER_SIZES } from '../api_config';

const Cards = () => {
  const breakpoint = 768
  const [page, setPage] = useState(1)
  const [getData, movies, loading] = useTmdbMain()

  const [genreID, setGenreID] = useState(null)
  const [genreName, setGenreName] = useState('Discover')
  const [offsetTop, setOffsetTop] = useState()

  const { path } = useParams() //get the current URL parameter
  console.log(path)

  const ref = useHandleScroll(() => {
    setOffsetTop(ref.current.getBoundingClientRect().top)
  })

  console.log('offsetTop', offsetTop)

  useEffect(() => {
    getData(page, genreID) 
  }, [path, page, genreID])

  const onButtonClick = () => {
    setPage((prev) => prev + 1)
  } 

  const renderedCards = movies.map((card, index) => {
    return (
      <Card 
        key={index} 
        id={card.id} 
        title={card.title} 
        imgURL={`${BASE_IMAGE_URL}${POSTER_SIZES[4]}${card.poster_path}`}
        rating={card.vote_average}
        loading={loading}
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
          offsetTop={offsetTop}
        />
      }

      <CardsHeader genreName={genreName}/>

      <div ref={ref} className="cards__wrapper">
        {renderedCards}
      </div>

      {loading 
        ? null 
        : <button className="loadMore-btn" onClick={onButtonClick}>Load more</button>
      }
    </section>
  )
}

export default Cards
