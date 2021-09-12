import React, { useState, useEffect } from 'react';
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
  const [searchedData, getData, isLoading, error] = useTmdb(GET.search, pageNum, input);

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

    getData(input) //invoke the getData function from the custom hook (useTmdb) 
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
          placeholder="Search your favourite movie" 
          onClick={onInputClick} 
          value={input}
          onChange={onChange}
          type="text"
        />
        <i 
          className={`fas ${input ? 'fa-times' : 'fa-search'}`}
          onClick={() => setInput('')} //reset input value
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
