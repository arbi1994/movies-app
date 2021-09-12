import { useState, useEffect } from 'react';
import tmdb from '../apis/tmdb';
import { BASE_URL } from '../api_config';

const useTmdb = (endpoint, pageNum, searchedTerm = '') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    getData(searchedTerm)

    // cleanup data
    return () => {
      setData([])
    }
  }, [searchedTerm])

  /**
   * setError to true if there is no data available and
   * isLoading is false
   */
  useEffect(() => {
    if(data.length <= 0 && searchedTerm && !isLoading) setError(true)

    return () => {
      setError(false)
    }
   
  }, [data])

  const getData = async (term) => {
    if(!term) return

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
      (data.length <= 0) ? setError(true) : setError(false)
    }

    setIsLoading(false) //set isLoading state back to false 
  }

  return [data, getData, isLoading, error];
}

export default useTmdb
