import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// Swiper core and required modules
import SwiperCore, {
  Autoplay,
  EffectFade
} from 'swiper';
// Components
import Hero from './Hero';
import Cards from '../Cards/index';
import GenresSelector from '../GenresSelector/index';
import ScrollUpButton from '../../components/ScrollUpButton';
// Hooks
import useHandleScroll from '../../hooks/useHandleScroll';
import useTmdbImages from '../../hooks/useTmdbImages';

// install Swiper modules
SwiperCore.use([Autoplay, EffectFade]);

const Main = () => {
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false)
  const ref = useHandleScroll(() => {
    setScrollToTopBtn(ref.current.getBoundingClientRect().top <= (-20))
  })
  const imgItems = useTmdbImages()

  const renderedImages = imgItems.map(imgItem => {
    return (
      <SwiperSlide>
        <img 
          key={imgItem.id} 
          src={imgItem.imgURL} 
          alt={imgItem.title}
        />
      </SwiperSlide>
    )
  })

  return (
    <main ref={ref}> 
      <section className="carousel">
        <Swiper
          effect={'fade'}
          speed={800}
          autoplay={{
            "delay": 4000,
            "disableOnInteraction": false
          }}
        >{renderedImages}</Swiper>
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
