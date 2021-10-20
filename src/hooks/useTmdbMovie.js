import { useState } from 'react';
// tmdb api
import tmdb from '../apis/tmdb';
// API config
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
  const [watchProviders, setWatchProviders] = useState([])

  //get data from api
  const getMovieDetails = async (id) => {
    setLoading(true)

    try {
      const { data } = await tmdb.get(`${BASE_URL}${GET.details}/${id}`, { 
        params: { 
          append_to_response: 'credits,videos,watch/providers',
        }
      })

      setMovieDetails(data)

      console.log(data)

      // get production country iso codes
      setProductionCountries(data.production_countries.map(country => country.iso_3166_1))

      // get credits properties
      const { cast, crew } = data.credits

      // set Directors
      setDirectors(crew.filter(member => {
        if(member.job === "Director"){
          return member
        }
      }).map(director => director.name))

      // set Cast
      setCast(cast.map(actor => actor.name))

      // set WatchProviders
      const { results } = data["watch/providers"]
      setWatchProviders(results)

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
    productionCountries, 
    directors,
    cast,
    watchProviders
  ]
}

export default useTmdbMovie
