import React from 'react';

const CardsHeader = ({ genreName }) => {
  return (
    <div className="cardsHeader">
      <hr/>
      <div className="cardsHeader__title">
        <h3>{genreName}</h3>
      </div>
      <hr/>
    </div>
  )
}

export default CardsHeader
