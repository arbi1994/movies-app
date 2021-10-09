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

  //get data from api
  const getMovieDetails = async (id) => {
    setLoading(true)
    try {
      const { data } = await tmdb.get(`${BASE_URL}${GET.details}/${id}`, { 
        params: { 
          append_to_response: 'videos'
        }
      })

      setMovieDetails(data)

      console.log(data)

      // get production country iso codes
      setProductionCountries(data.production_countries.map(country => country.iso_3166_1))

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return [getMovieDetails, movieDetails, loading, error, productionCountries]
}

export default useTmdbMovie
