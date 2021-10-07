import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

import useTmdbMovie from '../hooks/useTmdbMovie';
import { 
  BASE_IMAGE_URL, 
  BACKDROP_SIZES,
  POSTER_SIZES
} from '../api_config';
import { getYear } from '../helpers';

const Movie = () => {
  // window.scrollTo(0, 0);
  const { id } = useParams();
  const [getMovieDetails, movieDetails] = useTmdbMovie();

  useEffect(() => {
    getMovieDetails(id) // get data
  }, [])

  //extract all the parameters needed
  const { original_title, backdrop_path, genres, poster_path, release_date, runtime, vote_average, videos } = movieDetails

  return (
    <section className="movie-details">
      <div className="movie-details__backdrop">
        <img src={`${BASE_IMAGE_URL}${BACKDROP_SIZES[BACKDROP_SIZES.length - 1]}${backdrop_path}`}/>
      </div>

      <div className="movie-details__container">
        <div className="col-1">
          <div className="poster">
            <img src={`${BASE_IMAGE_URL}${POSTER_SIZES[POSTER_SIZES.length - 1]}${poster_path}`}/>
          </div>
        </div>

        <div className="col-2">
          <div className="details">
            <div className="details__header">
              <div className="details__header--title">
                <h3>{original_title}</h3>
                <h4>{vote_average}<span><h5>/10</h5></span></h4>
              </div>

              <div className="details__header--subtitle">
                <h6>{getYear(release_date)}</h6>
                <h6>{runtime}min</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Movie
