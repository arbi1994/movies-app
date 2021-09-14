import { useRef, useEffect } from 'react';

// Remove active state when the user clicks anywhere
// in the body document, besides the referenced DOM element
const useClickOutside = (handler) => {
  const domNode = useRef()

  useEffect(() => {
    const clickOutside = (e) => {
      e.stopPropagation();

      if(!domNode.current.contains(e.target)){
        handler()
      }
    }

    // mouse point event
    document.body.addEventListener("mousedown", clickOutside)
    // touch point event
    document.body.addEventListener("touchstart", clickOutside)

    //clean up function
    return () => {
      document.body.removeEventListener("mousedown", clickOutside)
      document.body.removeEventListener("touchstart", clickOutside)
    }
  }, []);

  return domNode
}

export default useClickOutside