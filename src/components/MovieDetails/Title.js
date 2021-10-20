import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const Title = ({ title, vote_average, loading }) => {
  return (
    <>
      {loading 
        ? <Skeleton
            className="title-loader" 
            sx={{ bgcolor: 'grey.900' }} 
            style={{ height: '50px', maxWidth: '60em' }}
          />
        : <div className="details__header--title">
            <h4>{title}</h4>
            {vote_average <= 0 ? null : <h5>{vote_average}<span><h6>/10</h6></span></h5>}
          </div>
      }
    </>
  )
}

export default Title
