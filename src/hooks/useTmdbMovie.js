import { useState, useEffect } from 'react';

import tmdb from '../apis/tmdb';
import { 
  GET,
  BASE_URL,
} from '../api_config';

const useTmdbMovie = () => {
  const [movieDetails, setMovieDetails] = useState([])

  //get data from api
  const getMovieDetails = async (id) => {
    try {
      const { data } = await tmdb.get(`${BASE_URL}${GET.details}/${id}`, { 
        params: { 
          append_to_response: 'videos'
        }
      })

      setMovieDetails(data)

    } catch (error) {
      console.log(error.message);
    }
  }

  return [getMovieDetails, movieDetails]
}

export default useTmdbMovie
