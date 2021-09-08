import React from 'react';
import navlinks from './navlinksConfig';
import useClickOutside from '../hooks/useClickOutside';

const Menu = ({ active, setActive }) => {

  const domNode = useClickOutside(() => {
    setActive(false);
  })

  return (
    <div ref={domNode} className={`menu ${active ? 'active' : ''}`}>
      <ul>
        {navlinks.map(links => { 
            return <li key={links.label}><a href={links.path}>{links.label}</a></li> 
          })
        }
      </ul>
    </div>
  )
}

export default Menu
