import { useState } from 'react';
import tmdb from '../apis/tmdb';
import { BASE_URL } from '../api_config';


const useTmdb = (endpoint, pageNum) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const getData = async (term) => {
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
          query: term
        }
      })
  
      setData(data.results) //populate response with data fetched

    } catch (error) {
      setError(true)
    }

    setIsLoading(false) //set isLoading state back to false 
  }

  return [data, getData, isLoading, error, setError];
}

export default useTmdb
