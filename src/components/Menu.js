import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
        <div key={links.id}>
          <li>{links.icon}
            <button class="discover-btn" onClick={onDiscoverClick}>
              {links.label} 
              {dropdownActive 
                ? <ArrowDropUpRoundedIcon style={iconStyle}/>
                : <ArrowDropDownRoundedIcon style={iconStyle}/>
              } 
            </button>
          </li>
          {dropdownActive ? <DiscoverMenu setActive={setActive} /> : null}
        </div>
      )
    }

    return (
      <li key={links.id}>{links.icon}
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

Menu.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func
}

export default Menu
