import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

import SearchWindow from './SearchWindow';
import SearchOverlay from './SearchOverlay';
import useClickOutside from '../hooks/useClickOutside';
import useTmdb from '../hooks/useTmdb';
import { GET } from '../api_config';

const SearchBar = () => {
  //set a default page value 
  /**
   * pageNum value needs to be changed to load more data
   */
  const pageNum = 1; 

  // hook to keep track of user events
  const [active, setActive] = useState(false);
  // hook to set the input value
  const [input, setInput] = useState("");
  // custom hook to get the data
  const [searchedData, getData, isLoading, error, setError] = useTmdb(GET.search, pageNum);

  /**
   * Custom hook to handle users clicks event
   * outside my specified ref (in this case I set form element as ref)
   */
  const inputRef = useClickOutside(() => {
    setActive(false); //set the active state back to false

    setInput(''); // reset input value
  })

  /**
   * onClick Handler
   * @param {Event Object} e 
   */
  const onInputClick = (e) => {
    e.preventDefault(); //prevent default browser behaviour

    setActive(true); //set the active state to true
  }

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
    getData(input) //getting the data we searched for
  }, [input])

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
  
  return (
    <>
      <form 
        onSubmit={(e) => e.preventDefault()}
        ref={inputRef}
        className="navbar__right--searchbar"
        style={{
          // change the border bottom style based on the active state
          borderBottomLeftRadius: `${active ? '0' : '10px'}`,
          borderBottomRightRadius: `${active ? '0' : '10px'}`, 
          zIndex: `${active ? '5000' : '0'}`
        }}
      >
        <input  
          className="input"
          type="text"
          onClick={onInputClick} 
          placeholder="Search your favourite movie" 
          onChange={debouncedInput}
        />
        <i 
          className={`fas ${input ? 'fa-times' : 'fa-search'}`}
          onClick={resetInputValue} //reset input value
        ></i>

        {active && 
          <SearchWindow 
            input={input} 
            searchedData={searchedData} 
            isLoading={isLoading} 
            error={error}
          />
        }
      </form> 

      {active && <SearchOverlay setActive={setActive} setInput={setInput} />}
    </>
  )
}

export default SearchBar
