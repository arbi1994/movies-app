import React from 'react';

import navlinks from './navlinksConfig';

const DiscoverMenu = () => {

  const rendereMenu = navlinks[1].movies.map((links, index) => {
    return <li key={index}><a href="/">{links.label}</a></li>
  })

  return (
    <div className="discover-menu">
      <ul>
        {rendereMenu}
      </ul>
    </div>
  )
}

export default DiscoverMenu
