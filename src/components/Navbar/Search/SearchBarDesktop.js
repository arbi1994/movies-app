import React, { useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
// Components
import Input from './Input';
import SearchWindow from './SearchWindow';
import SearchOverlay from './SearchOverlay';
// Hooks 
import useLockBodyScroll from '../../../hooks/useLockBodyScroll';
import useClickOutside from '../../../hooks/useClickOutside';

const SearchBarDesktop = ({ 
  active, 
  onInputClick, 
  debouncedInput, 
  resetInputValue, 
  setActive,
  input,
  setInput,
  searchedData,
  isLoading,
  error,
  page,
  setPage,
  totalPages
}) => {

  const inputRef = useRef() //inputRef

  useLockBodyScroll(active);

  const transition = useTransition(active, {
    config: { duration: 150 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },  
  })

  /**
   * Custom hook to handle users clicks event
   * outside my specified ref (in this case I set form element as ref)
   */
   const formRef = useClickOutside(() => {
    setActive(false); //set the active state back to false
    inputRef.current.style.visibility = "hidden"; //change input display style to none
    formRef.current.style.background = `${active ? '#19181b' : 'transparent'}` //change form background to transparent
  })

  /**
   * Set form element style on active state change
   */
  useEffect(() => {
    formRef.current.style.borderBottomLeftRadius = `${active ? '0' : '20px'}`
    formRef.current.style.borderBottomRightRadius = `${active ? '0' : '20px'}`
  }, [active])

  const onMouseOver = () => {
    setTimeout(() => {inputRef.current.style.visibility = "visible"}, 50)
    formRef.current.style.background = "#070014"
  }

  const onMouseLeave = () => {
    inputRef.current.style.visibility = `${active ? 'visible' : 'hidden'}`
    formRef.current.style.background = `${active ? '#070014' : 'transparent'}`
  }

  return (
    <>
      <form 
        ref={formRef}
        className="searchbar"
        tabIndex="0"
        role="search"
        onSubmit={(e) => e.preventDefault()}
        onMouseOver ={onMouseOver}
        onMouseLeave ={onMouseLeave}
        style={{width: `${active ? '60em' : ''}`}}
      >
        <span className="searchbar__icon">
          <i className="fas fa-search"></i>
        </span>
      
        <Input 
          inputRef={inputRef}
          onInputClick={onInputClick}
          debouncedInput={debouncedInput}
        />
        

        {active && 
          <i 
            className={input ? "fas fa-times" : null}
            onClick={resetInputValue} //reset input value
          ></i>
        }
        
        {transition((style, item) => 
            item 
              ? <animated.div style={style}>
                  <SearchWindow 
                    setActive={setActive}
                    input={input} 
                    formRef={formRef}
                    searchedData={searchedData} 
                    isLoading={isLoading} 
                    error={error}
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                  />
                </animated.div>
              : null
          )
        }
      </form> 
    
      {transition((style, item) => 
          item 
            ? <animated.div style={style}>
                <SearchOverlay setActive={setActive} setInput={setInput} />  
              </animated.div> 
            : null
        ) 
      }
    </>
  )
}

SearchBarDesktop.propTypes = {
  active: PropTypes.bool,
  onInputClick: PropTypes.func,
  debouncedInput: PropTypes.func,
  resetInputValue: PropTypes.func,
  setActive: PropTypes.func,
  input: PropTypes.string,
  setInput: PropTypes.func,
  searchedData: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPages: PropTypes.number,
}

export default SearchBarDesktop
