import React from 'react';

// api configurations
import { 
  BASE_IMAGE_URL, 
  BACKDROP_SIZES
} from '../../api_config';

import LoadingSpinner from '../LoadingSpinner';

const Backdrop = ({ title, backdrop_path, loading }) => {
  return (
    <div>
      {loading 
        ? <LoadingSpinner /> 
        : <img alt={title} src={`${BASE_IMAGE_URL}${BACKDROP_SIZES[BACKDROP_SIZES.length - 1]}${backdrop_path}`}/>
      }
    </div>
  )
}

export default Backdrop
