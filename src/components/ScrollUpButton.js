import React from 'react';
import { useSpring, animated } from 'react-spring';

const ScrollUpButton = ({ scrollToTopBtn }) => {
  const fade = useSpring({
    opacity: scrollToTopBtn ? 1 : 0,
  })

  return (
    scrollToTopBtn && 
    <animated.div style={fade}>
      <button className="scroll-up" onClick={() => window.scrollTo(0, 0)}><i className="fa fa-angle-up"></i></button>
    </animated.div>
  )
}

export default ScrollUpButton
