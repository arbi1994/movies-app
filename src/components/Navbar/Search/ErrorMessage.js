import React from 'react';
import notFoundImg from '../../../images/error/not-found.svg'

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <span>No data found. Please try again</span>
      <img width="200" alt="movie not found" src={notFoundImg} />
    </div>
  )
}

export default ErrorMessage
