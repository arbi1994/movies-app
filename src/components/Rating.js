import React from 'react';

const Rating = ({ rating }) => {
  return (
    <div className="card__rating">
      <h5>Rating</h5>

      <div className="rating-stars">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>

        <div className="rating-stars--inner" style={{width: `${((rating/10) * 100)}%`}}>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      </div>
    </div>
  )
}

export default Rating
