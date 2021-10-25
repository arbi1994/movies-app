import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// Swiper core and required modules
import SwiperCore, {
  Autoplay,
  EffectFade,
  Lazy,
} from 'swiper';
// Components
import Hero from './Hero';
import Cards from '../Cards/index';
import GenresSelector from '../GenresSelector/index';
import ScrollUpButton from '../../components/ScrollUpButton';
// Hooks
import useHandleScroll from '../../hooks/useHandleScroll';
import useTmdbImages from '../../hooks/useTmdbImages';
import useViewport from '../../hooks/useViewport';
import useHandleImgSize from '../../hooks/useHandleImgSize';
// api configuration
import { urlEndpoint, BACKDROP_SIZES } from '../../api_config';

// install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Lazy]);

const Main = () => {
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false)
  const ref = useHandleScroll(() => {
    setScrollToTopBtn(ref.current.getBoundingClientRect().top <= (-20))
  })
  const imgItems = useTmdbImages()
  const [width] = useViewport() 
  const tabletBreakpoint = 768
  const laptopBreakpoint = 1024

  const [size] = useHandleImgSize(
    width,
    tabletBreakpoint, 
    laptopBreakpoint, 
    BACKDROP_SIZES
  )

  const renderedImages = imgItems?.map(imgItem => {
    return (
      <SwiperSlide className="swiper-lazy">
        <img 
          key={imgItem.id} 
          src={`${urlEndpoint}t/p/${size}${imgItem.imgPath}`} 
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
          lazy
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
