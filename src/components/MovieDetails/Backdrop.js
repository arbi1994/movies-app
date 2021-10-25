import React from 'react';
// api configurations
import { 
  SECURE_BASE_IMAGE_URL,
  IMAGEKIT_URL, 
  BACKDROP_SIZES
} from '../../api_config';

import LoadingSpinner from '../LoadingSpinner';

const Backdrop = ({ title, backdrop_path, loading }) => {

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <img 
        alt={title} 
        src={`${SECURE_BASE_IMAGE_URL}${BACKDROP_SIZES[BACKDROP_SIZES.length - 1]}${backdrop_path}`}/>
    </>
  )
}

export default Backdrop
