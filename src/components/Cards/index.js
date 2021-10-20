import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GenresSelector from '../GenresSelector/index';
import Card from './Card';
import CardsHeader from './CardsHeader';

import useTmdbMain from '../../hooks/useTmdbMain';
import { IMAGEKIT_URL, POSTER_SIZES } from '../../api_config';

const Cards = ({ setDetails }) => {
  const [page, setPage] = useState(1)
  const [getData, movies, loading] = useTmdbMain()
  const [genreID, setGenreID] = useState(null)
  const [genreName, setGenreName] = useState('Discover')

  const { path } = useParams() //get the current URL parameter

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
        imgURL={`${IMAGEKIT_URL}t/p/${POSTER_SIZES[4]}${card.poster_path}`}
        rating={card.vote_average}
        loading={loading}
        setDetails={setDetails}
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
