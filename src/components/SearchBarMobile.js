import React from 'react';

import Input from './Input';
import SearchWindow from './SearchWindow';

const SearchBarMobile = ({ 
  input,
  activeSearch, 
  setActiveSearch,
  onInputClick, 
  debouncedInput,
  resetInputValue,
  searchedData,
  isLoading,
  error,
  page,
  setPage,
  totalPages 
}) => {
  return (
    <>
      <form 
        className={`mobile-searchbar ${activeSearch ? 'active' : ''}`}
        onSubmit={(e) => e.preventDefault()}  
      >
        <span 
          className={`close-icon ${activeSearch ? 'active' : ''}`}
          onClick={() => setActiveSearch(false)}
        >
          <i className="fas fa-times"></i>
        </span>

        <span className="searchbar__icon">
          <i className="fas fa-search"></i>
        </span>

        <Input 
          onInputClick={onInputClick}
          debouncedInput={debouncedInput}
        />

        <i 
          className={input ? "fas fa-times" : null}
          onClick={resetInputValue} //reset input value
        ></i>

        {activeSearch && 
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
    </>  
  )
}

export default SearchBarMobile
