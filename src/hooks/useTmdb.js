import { useState, useEffect } from 'react';
import tmdb from '../apis/tmdb';
import { BASE_URL } from '../api_config';

const useTmdb = (endpoint, pageNum, searchedTerm) => {
  const [data, setData] = useState([]);

  const getData = async (term) => {

    const {data} = await tmdb.get(`${BASE_URL}${endpoint}`, {
      params: {
        page: pageNum,
        query: term
      }
    })

    setData(data.results) //populate response with data fetched
  }

  useEffect(() => {
    if(searchedTerm !== '') getData(searchedTerm);
  }, [pageNum, searchedTerm])

  return [data, getData];
}

export default useTmdb
