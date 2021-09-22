import { useEffect, useRef } from 'react';

const useHandleScroll = (handler) => {
  const domElement = useRef(null);

  useEffect(() => {
    const handleScroll = () => {

      if (domElement.current) {
        handler()
      }
    };

    window.addEventListener("scroll", handleScroll)

    return () => {window.removeEventListener("scroll", handleScroll)};
  }, [])

  return domElement
}

export default useHandleScroll
