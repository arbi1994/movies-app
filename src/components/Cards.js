import React, { useEffect, useState, useRef } from 'react';
import GenresSelector from './GenresSelector';
import Card from './Card';

import useTmdbMain from '../hooks/useTmdbMain';
import useHandleScroll from '../hooks/useHandleScroll';
import { BASE_IMAGE_URL, POSTER_SIZES } from '../api_config';

const Cards = () => {
  const [page, setPage] = useState(1);
  const [getData, data, loading] = useTmdbMain()
  const [genreID, setGenreID] = useState(null);
  const [offsetTop, setOffsetTop] = useState()

  const ref = useRef();

  useEffect(() => {
    setOffsetTop(ref.current.getBoundingClientRect().top)
  }, [])

  console.log(offsetTop)

  useEffect(() => {
    getData(page, genreID)
  }, [page, genreID])

  const onButtonClick = () => {
    setPage((prev) => prev + 1)
  } 

  const renderedCards = data.map((card, index) => {
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
  const handleCallback = (id) => {
    setGenreID(id)
  }

  console.log(offsetTop)

  return (
    <section className="cards" id="cards">
      <GenresSelector 
        handleCallback={handleCallback}
        setPage={setPage}
        offsetTop={offsetTop}
      />

      <div ref={ref} className="cards__wrapper">
        {renderedCards}
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
