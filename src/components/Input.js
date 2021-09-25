import React from 'react'

const Input = ({ inputRef, onInputClick, debouncedInput }) => {
  return (
    <input  
      ref={inputRef}
      className="input"
      type="text"
      onClick={onInputClick} 
      placeholder="Search your favourite movie" 
      onChange={debouncedInput}
    />
  )
}

export default Input
