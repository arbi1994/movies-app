import { useState, useEffect } from 'react';

const useHandleImgSize = (width, tablet, laptop, size) => {
  const [imgSize, setImgSize] = useState()

  useEffect(() => {
    const handleImgSize = () => {
      if(width <= tablet) return setImgSize(size[1]) 
      if(width <= laptop) return setImgSize(size[2])
    
      return setImgSize(size[3])
    }

    handleImgSize()
  }, [width])
   
  return [imgSize]
}

export default useHandleImgSize;
