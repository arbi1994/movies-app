import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Tmdb api
import tmdb from '../apis/tmdb';
// api configurations
import { GET, BASE_URL } from '../api_config';
// Helper function
import { persistedState } from '../helpers';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
}

const useTmdbMain = () => {
  const { path } = useParams() //get the current URL parameter
  const [movies, setMovies] = useState(
    () => JSON.parse(localStorage.getItem(
      path !== undefined ? 'discover-data' : 'movies-data'
    )) || initialState
  )
  const [loading, setLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [genre, setGenre] = useState(
    () => JSON.parse(localStorage.getItem('genre-id')) || null
  )

  const [endpoint, setEndpoint] = useState(null)
    
  useEffect(() => {
    if(!path) return
    setEndpoint(`/movie/${path}`)
  }, [path])

  const getData = async (pageNum) => {
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

      setMovies(prev => ({
        ...data,
        results:
          pageNum > 1 ? [...prev.results, ...data?.results] : [...data?.results]
      }))
  
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  // console.log('genre', genre)
  const localState = persistedState('movies-data')
  const localDiscoverState = persistedState('discover-data')

  // Initial render
  useEffect(() => {
    if(movies.results.length !== 0) return
    getData(1)
  }, [])

  // Render on genre selection
  useEffect(() => {
    if(!genre) {
      console.log('ok')
      // getData(1)

      if(localState) {
        console.log('get data from local storage')
        setMovies(localState)
        return
      }
    }

    if(genre !== persistedState('genre-id')){
      console.log('get data')
      getData(1)
    }else{
      return
    } 

  }, [genre])

  useEffect(() => {
    if(endpoint !== `/movie/${path}`) return 
 
    if(endpoint){
      if(!path) return
      getData(1)
      // setIsLoaded(true)
    }
    
    if(localDiscoverState) {
      console.log('get data from local discover storage')
      setMovies(localDiscoverState)
      return
    }

  }, [endpoint])

  // Load more
  useEffect(() => {
    if(!isLoadingMore) return

    console.log('get data from load more')
    getData(movies?.page + 1)
    setIsLoadingMore(false)
  }, [isLoadingMore, movies])

  // Write to sessionStorage
  useEffect(() => {
    // console.log(path)
    if(path === undefined){
      localStorage.setItem('movies-data', JSON.stringify(movies))
      localStorage.setItem('genre-id', JSON.stringify(genre))
    }  
  }, [genre, movies])

  useEffect(() => {
    localStorage.setItem('discover-data', JSON.stringify(movies))
  }, [endpoint, movies])


  return [movies, loading, setIsLoadingMore, setGenre]
}

export default useTmdbMain