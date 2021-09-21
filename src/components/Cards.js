import React, { useEffect, useState } from 'react';
import Card from './Card';

import useTmdbMain from '../hooks/useTmdbMain';
import { BASE_IMAGE_URL, POSTER_SIZES } from '../api_config';

const Cards = ({ children }) => {
  const [page, setPage] = useState(1);
  const [getData, data, loading] = useTmdbMain()

  useEffect(() => {
    getData(page)
  }, [page])

  const onButtonClick = () => {
    setPage((prev) => prev + 1)
  } 

  const renderedCards = data.map(card => {
    return (
      <Card 
        key={card.id}
        title={card.title} 
        imgURL={`${BASE_IMAGE_URL}${POSTER_SIZES[4]}${card.poster_path}`}
        rating={card.vote_average}
        loading={loading}
      />
    )
  })

  return (
    <section className="cards">
      { children }
      <div className="cards__wrapper">
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
