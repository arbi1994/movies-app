import React, { useState, useEffect } from 'react';

import Cards from './Cards';
import useTmdbMain from '../hooks/useTmdbMain';

const Discover = () => {
  return (
    <div className="discover">
      <Cards />
    </div>
  )
}

export default Discover
