import { useState, useEffect } from 'react';
// api config
import { GET, BASE_URL, IMAGEKIT_URL, BACKDROP_SIZES } from '../api_config';
// tmdb api
import tmdb from '../apis/tmdb';

const useTmdbImages = () => {
  const [imgItems, setImgItems] = useState([])

  const getData = async (numberOfItems) => {
    
    try {
      const {data} = await tmdb.get(`${BASE_URL}${GET.discover}`, {
        params: {
          page: 1,
        }
      })

      const itemsURL = data?.results.slice(0, numberOfItems).map(item => {
        const {backdrop_path, id, title} = item
        const imgURL = `${IMAGEKIT_URL}t/p/${BACKDROP_SIZES[3]}${backdrop_path}`

        return {imgURL, id, title}
      })
      
      setImgItems(itemsURL)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getData(3)
  }, [])

  return imgItems
}

export default useTmdbImages
