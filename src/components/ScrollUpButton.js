import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

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

  const transition = useTransition(scrollToTopBtn, {
    config: { duration: 150 },
    from: { opacity: 0 },
    enter: { opacity: 1, zIndex: 5000 },
    leave: { opacity: 0 },
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
    <> 
      {transition((style, item) => 
        item 
          ? <animated.div style={style}>
              <button 
                className="scroll-up" 
                onClick={handleScroll}
              ><i className="fa fa-angle-up"></i>
              </button>
            </animated.div>
         : null
        )
      }
    </>
  )
}

export default ScrollUpButton
