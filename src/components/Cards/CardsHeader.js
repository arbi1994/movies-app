import React from 'react';

const CardsHeader = ({ genreName, path }) => {

  function setPath(string){
    return string
      .split('')
      .map((name, index) => {
        if(index === 0) return name.toUpperCase()
        if(name === '_' || name === '-') return ' '
        return name
      })
      .join('')
  }

  return (
    <div className="cardsHeader">
      <hr/>
      <div className="cardsHeader__title">
        {
          path 
            ? (
              <>
                <h2>{setPath(path).toUpperCase()}</h2>
                <h3 style={{marginTop: '1em'}}>{genreName.toUpperCase()}</h3>
              </>
            )
            : <h3>{genreName}</h3>
        }
      </div>
      <hr/>
    </div>
  )
}

export default CardsHeader
