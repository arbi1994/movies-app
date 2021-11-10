import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import useMeasure from "react-use-measure";
// Expand more icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Cast = ({ cast }) => {
  const defaultHeight = "40"
  const [open, setOpen] = useState(false)
  // Gets the height of the element (ref)
  const [ref, { height }] = useMeasure();
  // The height of the content inside of the accordion
  const [contentHeight, setContentHeight] = useState(defaultHeight);
  // Animations
  const expand = useSpring({
    config: { duration: 200 },
    height: open ? `${contentHeight}px` : defaultHeight
  });
  const spin = useSpring({
    config: { duration: 300 },
    transform: open ? "rotate(540deg)" : "rotate(0deg)",
  });

  useEffect(() => {
    //Sets initial height
    setContentHeight(height);
    //Adds resize event listener
    window.addEventListener("resize", setContentHeight(height));

    // Clean-up
    return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  const iconStyle = {
    color: '#a0a0a0',
    fontSize: '2rem',
    cursor: 'pointer'
  }

  return (
    <div className="details__main--cast">
      <h5>Cast</h5>
      
      <animated.div style={expand} className={`wrapper ${open ? 'active' : ''}`}>
        <p ref={ref}>{cast?.length >= 1 ? cast.join(' \u00B7 ') : 'Not available'}</p>
      </animated.div>

      <span onClick={() => setOpen(!open)}>
        {(() => {
          if(cast?.length > 4) {
            return (
              <animated.button 
                style={spin} 
                className="arrow-down"
              >
                <ExpandMoreIcon style={iconStyle} />
              </animated.button>
            )
          }
          })()
        }
      </span>
    </div>
  )
}

Cast.propTypes = {
  cast: PropTypes.array
}

export default Cast
