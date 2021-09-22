import React, { useState, useEffect } from 'react';
import "react-alice-carousel/lib/alice-carousel.css";

import { GET, BASE_URL, BASE_IMAGE_URL, BACKDROP_SIZES } from '../api_config';
import tmdb from '../apis/tmdb';
import AliceCarousel from 'react-alice-carousel';
import Hero from './Hero';
import Cards from './Cards';
import GenresSelector from './GenresSelector';
import ScrollUpButton from './ScrollUpButton';
import useHandleScroll from '../hooks/useHandleScroll';

const Main = () => {
  const [imgItems, setImgItems] = useState([])
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false)
  const ref = useHandleScroll(() => {
    setScrollToTopBtn(ref.current.getBoundingClientRect().top <= (-20))
  })

  console.log(scrollToTopBtn)

  const getData = async (numberOfItems) => {
    
    try {
      const {data} = await tmdb.get(`${BASE_URL}${GET.discover}`, {
        params: {
          page: 1,
        }
      })

      const itemsURL = data.results.slice(0, numberOfItems).map(item => {
        const {backdrop_path, id, title} = item
        const imgURL = `${BASE_IMAGE_URL}${BACKDROP_SIZES[3]}${backdrop_path}`

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

  return (
    <main ref={ref}> 
      <section className="carousel">
        <AliceCarousel 
            autoPlay={true}
            autoPlayInterval="5000"
            fadeOutAnimation={true}
            animationType="fadeout"
            fadeOutDuration="500"
            mouseTrackingEnabled={true}
            disableAutoPlayOnAction={true}
            disableButtonsControls
            disableDotsControls
            infinite={true}
          >
            {imgItems.map(imgItem => {
              return <img key={imgItem.id} src={imgItem.imgURL} alt={imgItem.title}/>
            })}
        </AliceCarousel>
      </section>
            
      <Hero />

      <Cards>
        <GenresSelector />
      </Cards>

      <ScrollUpButton scrollToTopBtn={scrollToTopBtn}/>
      
    </main>
  )
}

export default Main
