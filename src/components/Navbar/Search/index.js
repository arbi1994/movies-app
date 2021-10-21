import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
// Hooks
import useTmdbSearch from '../../../hooks/useTmdbSearch';
import useViewport from '../../../hooks/useViewport';
//Components
import SearchBarMobile from './SearchBarMobile';
import SearchBarDesktop from './SearchBarDesktop';
// API config
import { GET } from '../../../api_config';

const SearchBar = ({ activeSearch, setActiveSearch }) => {
  const [page, setPage] = useState(1);
  // hook to keep track of user events
  const [active, setActive] = useState(false);
  // hook to set the input value
  const [input, setInput] = useState("");
  // hook to keep track of the portview width
  const [width] = useViewport();
  const breakpoint = 768 // tablet viewport width
  // custom hook to get the data
  const [
    searchedData,
    getData, 
    isLoading, 
    error, 
    setError,
    totalPages
  ] = useTmdbSearch(GET.search, page);

  /**
   * onClick Handler
   * @param {Event Object} e 
   */
  const onInputClick = (e) => {
    e.preventDefault(); //prevent default browser behaviour
    width > breakpoint ? setActive(true) : setActiveSearch(true) //set the active state to true
  }

  /**
   * onChange Handler
   * @param {Event Object} e 
   */
  const onChange = (e) => {
    setInput(e.target.value) //set the input state to the input value
  }

  // Applied a debounce of 300ms with useMemo hook for performance optimization
  const debouncedInput = useMemo(() => debounce(onChange, 300), [input])

  /**
   * Stop the invocation of the debounced function
   * after unmounting
   */
  useEffect(() => {
    return () => {
      debouncedInput.cancel()
    }
  }, [])

  /**
   * Fetch the data
   */
  useEffect(() => {
    getData(input) //getting the data we searched for

    if(input === '') setPage(1)
  }, [input, page])

  /**
   * Display error message if what we are searching for 
    gives us no data
  */
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

  return (
    <>
      {width <= breakpoint 
        ? <SearchBarMobile 
            input={input}
            onInputClick={onInputClick}
            debouncedInput={debouncedInput}
            resetInputValue={resetInputValue}
            searchedData={searchedData}
            isLoading={isLoading}
            error={error}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            activeSearch={activeSearch}
            setActiveSearch={setActiveSearch}
          />
        : <SearchBarDesktop 
            active={active} 
            setActive={setActive}
            onInputClick={onInputClick}
            debouncedInput={debouncedInput}
            resetInputValue={resetInputValue}
            input={input}
            setInput={setInput}
            searchedData={searchedData}
            isLoading={isLoading}
            error={error}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
      }
    </>
  )
}

export default SearchBar
