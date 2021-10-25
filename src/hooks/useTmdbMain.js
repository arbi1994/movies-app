import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import tmdb from '../apis/tmdb';
import { GET, BASE_URL } from '../api_config';

const useTmdbMain = () => {
  const [endpoint, setEndpoint] = useState()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const { path } = useParams() //get the current URL parameter

  // console.log("path: ", path)

  // console.log("endpoint: ", endpoint)
    
  useEffect(() => {
    setEndpoint(`/movie/${path}`)
  }, [])

  const getData = async (pageNum, genre) => {
    setLoading(true)

    try {
      const {data} = await tmdb.get(`${BASE_URL}${path ? endpoint : GET.discover}`, {
        params: {
          page: pageNum,
          with_genres: genre,
          sort_by: 'popularity.desc',
          include_adult: false,
        }
      })

      setMovies(prev => (
        pageNum > 1
        ? [...new Set([...prev, ...data.results])] 
        : [...data.results]
      ))
  
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  //console.log(data)

  return [getData, movies, loading]
}

export default useTmdbMain