import React from 'react';

const SearchOverlay = ({ setActive, setInput }) => {

  return (

    <div 
      className="search-overlay" 
      onClick={() => {
        setActive(false)
        setInput('')
      }}
    ></div>

  )
}

export default SearchOverlay
