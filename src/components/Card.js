import React from 'react';

const Card = ({ title, imgURL }) => {
  return (
    <div className="card">
      <span className="card__title">
        <h5 >{title}</h5>
      </span>
      <figure className="card__img">
        <img src={imgURL}/>
      </figure>
    </div>
  )
}

export default Card
