import React from 'react';
import { useSpring, animated } from 'react-spring';

const SearchWindow = ({ input }) => {

  // set fade animation with useSpring hook
  const fade = useSpring({
    from: {opacity: 0},
    to: {opacity: 1},
    config: { duration: 200}
  })

  return (
    <animated.div style={fade}>
      <div className="search-window">
        <hr className="search-window__top-line"></hr>

        <div className="search-window__wrapper">
          <h2>{input ? `Results for: ${input}` : ''}</h2>
        </div>
      </div>
    </animated.div>
  )
}

export default SearchWindow
