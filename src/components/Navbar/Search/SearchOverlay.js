import React from 'react';

const SearchOverlay = ({ setActive, setInput }) => {

  const onClick = () => {
    setActive(false)
    setInput('')
  }

  return (
    <div 
      className="search-overlay" 
      onClick={onClick}
    ></div>
  )
}

export default SearchOverlay
