import { useState, useEffect } from 'react';
import tmdb from '../apis/tmdb';
import { GET, BASE_URL } from '../api_config';

const useTmdbMain = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async (pageNum) => {
    setLoading(true)

    try {
      const {data} = await tmdb.get(`${BASE_URL}${GET.discover}`, {
        params: {
          page: pageNum,
        }
      })

      setData((prev) => (
        pageNum > 1
        ? [...prev, ...data.results] 
        : [...data.results]
      ))
  
      setLoading(false)

    } catch (error) {
      console.log(error.message)
    }
  }

  //console.log(data)

  return [getData, data, loading]
}

export default useTmdbMain