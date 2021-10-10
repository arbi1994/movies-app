import { useState, useEffect } from 'react';

import tmdb from '../apis/tmdb';
import { 
  GET,
  BASE_URL,
} from '../api_config';

const useTmdbMovie = () => {
  const [movieDetails, setMovieDetails] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [productionCountries, setProductionCountries] = useState()
  const [directors, setDirectors] = useState()
  const [cast, setCast] = useState()

  //get data from api
  const getMovieDetails = async (id) => {
    setLoading(true)
    try {
      const { data } = await tmdb.get(`${BASE_URL}${GET.details}/${id}`, { 
        params: { 
          append_to_response: 'credits,videos',
        }
      })

      setMovieDetails(data)

      console.log(data)

      // get production country iso codes
      setProductionCountries(data.production_countries.map(country => country.iso_3166_1))

      // get credits properties
      const { cast, crew } = data.credits

      setDirectors(crew.filter(member => {
        if(member.job === "Director"){
          return member
        }
      }).map(director => director.name))

      setCast(cast.map(actor => actor.name))

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return [
    getMovieDetails, 
    movieDetails, 
    loading, 
    error, 
    productionCountries, 
    directors,
    cast
  ]
}

export default useTmdbMovie
