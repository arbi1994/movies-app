import { useLayoutEffect } from 'react';

const useLockBodyScroll = (state) => {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    if(state === true) document.body.style.overflow = "hidden";
    // if(state === false) document.body.style.overflow = originalStyle;
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, [state]); 
}

export default useLockBodyScroll
