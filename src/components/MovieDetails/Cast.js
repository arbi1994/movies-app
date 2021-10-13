import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Cast = ({ cast }) => {
  const [active, setActive] = useState(false)

  const iconStyle = {
    color: '#a0a0a0',
    fontSize: '2rem',
    cursor: 'pointer'
  }

  return (
 
    <div className="details__main--cast">
      <h5>Cast</h5>
      <div className={`wrapper ${active ? "active" : ''}`}>
        <p>{cast?.length > 1 ? cast.join(' \u00B7 ') : ''}</p>
      </div>
      <span 
        className={active ? 'down' : 'up'}
        onClick={() => setActive(!active)}
      >
        {active 
          ? <ExpandLessIcon style={iconStyle} />
          : <ExpandMoreIcon style={iconStyle} />
        }
      </span>
    </div>
   
  )
}

export default Cast
