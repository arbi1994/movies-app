import React from 'react';
import Skeleton from '@mui/material/Skeleton';
// api configurations
import { 
  BASE_IMAGE_URL, 
  POSTER_SIZES
} from '../../api_config';

const Poster = ({ poster_path, loading }) => {
  return (
    <>
      {loading 
        ? <Skeleton 
            variant="rectangular" 
            style={{ minWidth: '35em', height: '40em'}}
            sx={{ bgcolor: 'grey.900' }}
          /> 
        : <div className="poster">
            <img src={`${BASE_IMAGE_URL}${POSTER_SIZES[POSTER_SIZES.length - 1]}${poster_path}`}/>
          </div>
      }
    </>
  )
}

export default Poster
