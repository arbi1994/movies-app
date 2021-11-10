import React from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
// Hooks 
import useLockBodyScroll from '../../../hooks/useLockBodyScroll';
// Components
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

  useLockBodyScroll(activeSearch);

  const transition = useTransition(activeSearch, {
    config: { duration: 150 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <>
      {transition((style, item) => 
          item 
            ? <animated.form 
                style={style}  
                className="mobile-searchbar"
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

                <SearchWindow 
                  setActiveSearch={setActiveSearch}
                  input={input} 
                  searchedData={searchedData} 
                  isLoading={isLoading} 
                  error={error}
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </animated.form>
            : null
          )
        }
    </>  
  )
}

SearchBarMobile.propTypes = {
  input: PropTypes.string,
  activeSearch: PropTypes.bool,
  setActiveSearch: PropTypes.string,
  onInputClick: PropTypes.func,
  debouncedInput: PropTypes.func,
  resetInputValue: PropTypes.func,
  searchedData: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPages: PropTypes.number,
}

export default SearchBarMobile
