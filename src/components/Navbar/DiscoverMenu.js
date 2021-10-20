import React from 'react';
import { Link } from 'react-router-dom';

import navlinks from '../navlinksConfig';
import useViewport from '../../hooks/useViewport';

const DiscoverMenu = ({ setActive }) => {
  const [width] = useViewport()
  const breakpoint = 1024

  const rendereMenu = navlinks[1].movies.map((links, index) => {
    return (
      <li key={index}>
        <Link 
          to={`/discover/${links.path}`} 
          className="discover-menu__links"
          onClick={() => setActive(false)}
        >
          {links.label}
        </Link>
      </li>
    )
  })

  return (
    <>
      <div className={`discover-menu ${width <= breakpoint ? 'mobile' : 'desktop'}`}>
        <ul>
          {rendereMenu}
        </ul>
      </div>
    </>
  )
}

export default DiscoverMenu
