import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
// Material UI components
import Skeleton from '@mui/material/Skeleton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
// Hooks
import useTmdbMovie from '../../hooks/useTmdbMovie';
// Components 
import Backdrop from './Backdrop';
import Poster from './Poster';
import Title from './Title';
import SubTitle from './SubTitle';
import Directors from './Directors';
import Genres from './Genres';
import Cast from './Cast';
import Description from './Description';
import Trailer from './Trailer';
import WatchProviders from './WatchProviders/index';

const Movie = () => {
  const { id } = useParams();
  const { pathname } = useLocation()
  const [
    getMovieDetails, 
    movieDetails, 
    loading,
    error,
    productionCountries,
    directors,
    cast,
    watchProviders
  ] = useTmdbMovie();

  // Trailer component states
  const [active, setActive] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)

  const [country, setCountry] = useState('');

  useEffect(() => {
    getMovieDetails(id) // get data
  }, [id])

  //extract all the parameters needed
  const { 
    title, 
    backdrop_path, 
    genres, 
    poster_path,
    release_date, 
    runtime, 
    vote_average,
    overview,
    videos,
  } = movieDetails;

  /**
   * Set the trailer key
   */
  useEffect(() => {
    videos?.results
    .filter(videos => videos.type === 'Trailer')
    .map((video, index) => index === 0 ? setTrailerKey(video.key) : null)    
  }, [active])

  /**
   * Change active state on pathname change
   */
  useEffect(() => {
    setActive(false)
  }, [pathname])

  return (
    <section className="movie-details">
      <div className="movie-details__backdrop">
        <Backdrop backdrop_path={backdrop_path} loading={loading} />
      </div>

      <div className="movie-details__play" onClick={() => setActive(true)}>
        {active ? '' : <PlayArrowRoundedIcon sx={{ fontSize: 60 }}/>}
        {active && <Trailer trailerKey={trailerKey}/>}
      </div>
      
      <div className="movie-details__container">
        <div className="col-1">
          <Poster poster_path={poster_path} loading={loading} />      
        </div>
        
        <div className="col-2">
          <div className="details">
            <div className="details__header">
              <Title 
                title={title} 
                vote_average={vote_average} 
                loading={loading} 
              />
              <SubTitle 
                productionCountries={productionCountries} 
                release_date={release_date} 
                runtime={runtime} 
                loading={loading} 
              />
            </div>

            <hr className="details__line-separator"/>

            <div className="details__main">
              {loading 
                ? <Skeleton 
                    variant="rectangular" 
                    style={{ maxWidth: '60em', height: '50em'}}
                    sx={{ bgcolor: 'grey.900' }}
                  />
                : <>
                    <Directors directors={directors} />
                    <Genres genres={genres} />
                    <Cast cast={cast} />
                    <Description overview={overview}/>
                  </>
              }
            </div>
          </div>  
        </div>

        <WatchProviders 
          watchProviders={watchProviders} 
          country={country} 
          setCountry={setCountry} 
          pathname={pathname}
        />
       
      </div>
    </section>
  )
}

export default Movie
