import { useState } from 'react';
import tmdb from '../apis/tmdb';
import { BASE_URL } from '../api_config';

const useTmdb = (endpoint, pageNum) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [totalPages, setTotalPages] = useState()

  const getData = async (term = '') => {
    // Check if there is any term
    if(!term) {
      setData([])
      return 
    }

    try {
      setError(false)
      setIsLoading(true) //set isLoading state to true

      const {data} = await tmdb.get(`${BASE_URL}${endpoint}`, {
        params: {
          page: pageNum,
          query: `${decodeURIComponent(term)}`
        }
      })
  
      //setTotalPages(data)
      setTotalPages(data.total_pages)

      //populate response with data fetched
      setData((prev) => (
        pageNum > 1
        ? [...prev, ...data.results] 
        : [...data.results]
      ))

    } catch (error) {
      setError(true)
    }

    setIsLoading(false) //set isLoading state back to false 
  }

  return [data, getData, isLoading, error, setError, totalPages];
}

export default useTmdb
