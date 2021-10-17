import { useState, useEffect } from 'react';
import { GET, BASE_URL} from '../api_config';
import tmdb from '../apis/tmdb';

const useTmdbConfig = () => {
  const [data, setData] = useState([])

  const getConfigData = async () => {
    try {
      const { data } = await tmdb.get(`${BASE_URL}${GET.configuration}`)  
      
      setData(data)

    } catch (error) {
      console.log(error.message);
    }
  } 

  useEffect(() => {
    getConfigData()
  }, [])
  
  return [data]
}

export default useTmdbConfig
