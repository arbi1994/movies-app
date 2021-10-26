import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const ScrollUpButton = () => {
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.getBoundingClientRect().top < -20
      ? setScrollToTopBtn(true)
      : setScrollToTopBtn(false)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const fade = useSpring({
    opacity: scrollToTopBtn ? 1 : 0,
  })

  const handleScroll = () => {
    try{
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }catch(error){
      window.scrollTo(0, 0)
    }
  }

  return (
    scrollToTopBtn && 
    <animated.div style={fade}>
      <button 
        className="scroll-up" 
        onClick={handleScroll}
      ><i className="fa fa-angle-up"></i>
      </button>
    </animated.div>
  )
}

export default ScrollUpButton
