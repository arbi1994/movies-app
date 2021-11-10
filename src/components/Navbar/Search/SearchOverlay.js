import React from 'react';
import PropTypes from 'prop-types';

const SearchOverlay = ({ setActive, setInput }) => {
  const onClick = () => {
    setActive(false)
    setInput('')
  }

  return (
    <div className="search-overlay" onClick={onClick}></div>
  )
}

SearchOverlay.propTypes = {
  setActive: PropTypes.func,
  setInput: PropTypes.func
}

export default SearchOverlay
