import React, { useState, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';

import SearchWindow from './SearchWindow';
import SearchOverlay from './SearchOverlay';
import useClickOutside from '../hooks/useClickOutside';
import useTmdbSearch from '../hooks/useTmdbSearch';
import { GET } from '../api_config';

const SearchBar = () => {
  const inputRef = useRef() //inputRef

  const [page, setPage] = useState(1);
  // hook to keep track of user events
  const [active, setActive] = useState(false);
  // hook to set the input value
  const [input, setInput] = useState("");
  // hook to keep track of the portview width
  const [width, setWidth] = useState(window.innerWidth);

  // custom hook to get the data
  const [
    searchedData,
    getData, 
    isLoading, 
    error, 
    setError,
    totalPages] = useTmdbSearch(GET.search, page);

  /**
   * onClick Handler
   * @param {Event Object} e 
   */
  const onInputClick = (e) => {
    e.preventDefault(); //prevent default browser behaviour
    setActive(true); //set the active state to true
  }

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
   * set form element style on active state change
   */
  useEffect(() => {
    formRef.current.style.borderBottomLeftRadius = `${active ? '0' : '20px'}`
    formRef.current.style.borderBottomRightRadius = `${active ? '0' : '20px'}`
  }, [active])

  /**
   * onChange Handler
   * @param {Event Object} e 
   */
  const onChange = (e) => {
    setInput(e.target.value) //set the input state to the input value
  }

  // Applied a debounce of 500ms with useMemo hook for performance optimization
  const debouncedInput = useMemo(() => debounce(onChange, 300), [input])

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedInput.cancel()
    }
  }, [])

  // Fetch the data
  useEffect(() => {
    // console.log(totalPages)

    getData(input) //getting the data we searched for

    if(input === '') setPage(1)

    console.log(page)
  }, [input, page])

  // Display error message if what we are searching for 
  // gives us no data
  useEffect(() => {
    (input !== '' && searchedData.length === 0)
    ? setError(true) 
    : setError(false)

    return () => {
      setError(false)
    }
  }, [searchedData])

  /**
   * Reset input value and input state
   */
  const resetInputValue = () => {
    document.querySelector(".input").value = ""

    setInput("")
  }

  /**
   * Check number of pages
   */
  useEffect(() => {
    if(page <= totalPages) return
  }, [page])

  /**
   * Handle portview width resize
   */
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);


  return (
    <>
      <form 
        onSubmit={(e) => e.preventDefault()}
        onMouseOver ={() => {
          setTimeout(() => {inputRef.current.style.visibility = "visible"}, 50)
          formRef.current.style.background = "#19181b"
        }}
        onMouseLeave ={() => {
          inputRef.current.style.visibility = `${active ? 'visible' : 'hidden'}`
          formRef.current.style.background = `${active ? '#19181b' : 'transparent'}`
        }}
        ref={formRef}
        className="searchbar"
        style={width > 768 ? {width: `${active ? '60em' : ''}`} : {width: `${active ? '40em' : ''}`}}
        tabIndex="0"
        role="search"
      >
        <span className="searchbar__icon">
          <i className="fas fa-search"></i>
        </span>
      
        <input  
          ref={inputRef}
          className="input"
          type="text"
          onClick={onInputClick} 
          placeholder="Search your favourite movie" 
          onChange={debouncedInput}
        />

        {active && 
          <i 
            className={input ? "fas fa-times" : null}
            onClick={resetInputValue} //reset input value
          ></i>
        }
        
        {active &&
          <SearchWindow 
            input={input} 
            searchedData={searchedData} 
            isLoading={isLoading} 
            error={error}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        }
      </form> 

      {active && <SearchOverlay setActive={setActive} setInput={setInput} />}
    </>
  )
}

export default SearchBar
