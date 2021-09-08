import React, { useState, useEffect } from 'react';
import SearchWindow from './SearchWindow';
import SearchOverlay from './SearchOverlay';
import useClickOutside from '../hooks/useClickOutside';

const SearchBar = () => {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState('');

  const inputRef = useClickOutside(() => {
    setActive(false);
    setInput(''); // reset input value
  })

  const onInputClick = (e) => {
    e.preventDefault();
    setActive(true);
  }
  
  return (
    <>
      <form 
        onSubmit={(e) => e.preventDefault()}
        ref={inputRef}
        className="navbar__right--searchbar"
        style={{
          borderBottomLeftRadius: `${active ? '0' : '10px'}`,
          borderBottomRightRadius: `${active ? '0' : '10px'}`, 
          zIndex: `${active ? '5000' : '0'}`
        }}
    
      >
        <input  
          placeholder="Search your favourite movie" 
          onClick={onInputClick} 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <i 
          className={`fas ${input ? 'fa-times' : 'fa-search'}`}
          onClick={() => setInput('')} //reset input value
        ></i>

        {active && <SearchWindow input={input}/>}
      </form> 

      {active && <SearchOverlay setActive={setActive} setInput={setInput} />}
    </>
  )
}

export default SearchBar
