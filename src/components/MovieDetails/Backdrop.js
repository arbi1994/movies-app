import React from 'react';
// api configurations
import { 
  SECURE_BASE_IMAGE_URL,
  BACKDROP_SIZES
} from '../../api_config';
// Hooks
import useViewport from '../../hooks/useViewport';
import useHandleImgSize from '../../hooks/useHandleImgSize';
// Components
import LoadingSpinner from '../LoadingSpinner';

const Backdrop = ({ title, backdrop_path, loading }) => {
  const [width] = useViewport() 
  const tabletBreakpoint = 768
  const laptopBreakpoint = 1024

  const [size] = useHandleImgSize(
    width,
    tabletBreakpoint, 
    laptopBreakpoint, 
    BACKDROP_SIZES
  )

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <img 
        alt={title} 
        src={`${SECURE_BASE_IMAGE_URL}${size}${backdrop_path}`}/>
    </>
  )
}

export default Backdrop
