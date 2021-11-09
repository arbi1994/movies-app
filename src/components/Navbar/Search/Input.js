import React from 'react';
import PropTypes from 'prop-types';

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

Input.propTypes = {
  inputRef: PropTypes.object,
  onInputClick: PropTypes.func,
  debouncedInput: PropTypes.func
}

export default Input
