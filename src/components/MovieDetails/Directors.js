import React from 'react';
import { splitData } from '../../helpers';

const Directors = ({ directors }) => {
  return (
    <>
      <div className="details__main--directors">
        <h5>Director{directors?.length > 1 ? 's' : ''}</h5>
        <p>{splitData(directors)}</p>
      </div>
    </>
  )
}

export default Directors
