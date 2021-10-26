import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import tmdb from '../apis/tmdb';
import { GET, BASE_URL } from '../api_config';

const useTmdbMain = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const { path } = useParams() //get the current URL parameter
  const [endpoint, setEndpoint] = useState(`/movie/${path}`)
    
  useEffect(() => {
    if(path === undefined || path === null) return
    setEndpoint(`/movie/${path}`)
  }, [path])

  const getData = async (pageNum, genre) => {
    setLoading(true)

    try {
      const {data} = await tmdb.get(`${BASE_URL}${!path ? GET.discover : endpoint}`, {
        params: {
          page: pageNum,
          with_genres: genre,
          sort_by: 'popularity.desc',
          include_adult: false,
        }
      })

      setMovies(prev => (
        pageNum > 1
        ? [...new Set([...prev, ...data?.results])] 
        : [...data?.results]
      ))
  
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return [getData, movies, loading, endpoint]
}

export default useTmdbMain