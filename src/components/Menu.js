import React, { useState } from 'react';
// Material ui icons 
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// navlinks configuration
import navlinks from './navlinksConfig';
// Components
import useClickOutside from '../hooks/useClickOutside';
// Components
import DiscoverMenu from './Navbar/DiscoverMenu';

const Menu = ({ active, setActive }) => {
  const [dropdownActive, setDropdownActive] = useState(false)

  const domNode = useClickOutside(() => {
    setActive(false);
  })

  const iconStyle = {
    fontSize: '2.4rem',
    color: '#f4f0fa',
  }

  const onDiscoverClick = () => {
    setDropdownActive(!dropdownActive)
    setActive(true)
  }

  const renderedMenu = navlinks.map((links, index) => { 
    if(links.label === 'Discover'){
      return (
        <>
          <li key={index}>{links.icon}
            <a onClick={onDiscoverClick}>
              {links.label} 
              {dropdownActive 
                ? <ArrowDropUpRoundedIcon style={iconStyle}/>
                : <ArrowDropDownRoundedIcon style={iconStyle}/>
              } 
            </a>
          </li>
          {dropdownActive ? <DiscoverMenu setActive={setActive} /> : null}
        </>
      )
    }

    return (
      <li key={index}>{links.icon}
        <a 
          href={links.path} 
          onClick={() => setActive(false)}
        >{links.label}</a>
      </li> 
    )
  })

  return (
    <div ref={domNode} className={`menu ${active ? 'active' : ''}`}>
      
      <div 
        className="close-menu"
        onClick={() => setActive(false)}
      ><CloseRoundedIcon style={iconStyle}/></div>
      
      <ul>
        {renderedMenu}
      </ul>
    </div>
  )
}

export default Menu
