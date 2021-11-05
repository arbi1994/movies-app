import React from 'react';
import { Link } from 'react-router-dom';
// navlinks configuration
import navlinks from '../navlinksConfig';
// hooks
import useViewport from '../../hooks/useViewport';

const DiscoverMenu = ({ setActive }) => {
  const [width] = useViewport()
  const breakpoint = 1024

  const rendereMenu = navlinks[1].movies.map((links, index) => {
    const genreName = localStorage.getItem('genre')
    return (
      <li key={links.id} onClick={() => setActive(false)}>
        <Link 
          to={`/discover/${links.path}?genre=${JSON.parse(genreName.split(' ').join('-').toLocaleLowerCase())}`} 
          className="discover-menu__links"
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
