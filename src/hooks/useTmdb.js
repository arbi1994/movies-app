import { useState, useEffect } from 'react';
import tmdb from '../apis/tmdb';
import { BASE_URL } from '../api_config';

const useTmdb = (endpoint, pageNum, searchedTerm = '') => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if(searchedTerm !== '') getData(searchedTerm);
  }, [pageNum, searchedTerm])

  const getData = async (term) => {
    if(!term) return

    const {data} = await tmdb.get(`${BASE_URL}${endpoint}`, {
      params: {
        page: pageNum,
        query: term
      }
    })

    setData(data.results) //populate response with data fetched
  }

  return [data, getData];
}

export default useTmdb
