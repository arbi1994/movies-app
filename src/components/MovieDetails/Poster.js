import React from 'react';
import Skeleton from '@mui/material/Skeleton';
// api configurations
import { 
  SECURE_BASE_IMAGE_URL,
  IMAGEKIT_URL, 
  POSTER_SIZES
} from '../../api_config';

const Poster = ({ title, poster_path, loading }) => {
  
  if(loading) {
    return (
      <Skeleton 
        variant="rectangular" 
        style={{ minWidth: '35em', height: '40em'}}
        sx={{ bgcolor: 'grey.900' }}
      /> 
    )
  }

  return (
    <>
      <div className="poster">
        <img 
          alt={title} 
          src={`${SECURE_BASE_IMAGE_URL}${POSTER_SIZES[POSTER_SIZES.length - 1]}${poster_path}`}/>
      </div>
    </>
  )
}

export default Poster
