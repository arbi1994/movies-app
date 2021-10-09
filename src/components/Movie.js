import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
// import ContentLoader from "react-content-loader";
// Hooks
import useTmdbMovie from '../hooks/useTmdbMovie';
// api configurations
import { 
  BASE_IMAGE_URL, 
  BACKDROP_SIZES,
  POSTER_SIZES
} from '../api_config';
// Helper functions
import { getYear, splitData } from '../helpers';
// Components 
import LoadingSpinner from './LoadingSpinner';

const Movie = () => {
  // window.scrollTo(0, 0);
  const { id } = useParams();
  const [
    getMovieDetails, 
    movieDetails, 
    loading,
    error,
    productionCountries
  ] = useTmdbMovie();

  useEffect(() => {
    getMovieDetails(id) // get data
  }, [])

  //extract all the parameters needed
  const { 
    title, 
    backdrop_path, 
    genres, 
    poster_path,
    release_date, 
    runtime, 
    vote_average, 
    videos 
  } = movieDetails;

  return (
    <section className="movie-details">
      <div className="movie-details__backdrop">
        {loading 
            ? <LoadingSpinner /> 
            : <img src={`${BASE_IMAGE_URL}${BACKDROP_SIZES[BACKDROP_SIZES.length - 1]}${backdrop_path}`}/>
        }
      </div>
      
      <div className="movie-details__container">
        <div className="col-1">
          {loading 
            ? <Skeleton 
                variant="rectangular" 
                style={{ minWidth: '35em', height: '40em'}}
                sx={{ bgcolor: 'grey.900' }}
              /> 
            : <div className="poster">
                <img src={`${BASE_IMAGE_URL}${POSTER_SIZES[POSTER_SIZES.length - 1]}${poster_path}`}/>
              </div>
          }
         
        </div>
        
        <div className="col-2">
          <div className="details">
            <div className="details__header">
              {loading 
                ? <Skeleton
                    className="title-loader" 
                    sx={{ bgcolor: 'grey.900' }} 
                    style={{ height: '50px' }}
                  />
                : <div className="details__header--title">
                    <h3>{title}</h3>
                    <h4>{vote_average}<span><h5>/10</h5></span></h4>
                  </div>
              }
             
              {loading 
                ? <Skeleton 
                    className="subtitle-loader"
                    sx={{ bgcolor: 'grey.900' }} 
                    style={{ height: '25px' }}
                  />
                : <div className="details__header--subtitle">
                    <h6>{splitData(productionCountries)}</h6>
                    <h6>{getYear(release_date)}</h6>
                    <h6>{runtime}min</h6>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Movie
