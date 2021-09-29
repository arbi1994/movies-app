import React, { useState } from 'react';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import navlinks from './navlinksConfig';
import useClickOutside from '../hooks/useClickOutside';
import DiscoverMenu from './DiscoverMenu';

const Menu = () => {
  const [active, setActive] = useState(false)
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
  }

  return (
    <div ref={domNode} className={`menu ${active ? 'active' : ''}`}>
      
      <div 
        className="close-menu"
        onClick={() => setActive(false)}
      ><CloseRoundedIcon style={iconStyle}/></div>
      
      <ul>
        {navlinks.map((links, index) => { 

            if(links.label === 'Discover'){

              return (
                <>
                  <li key={links.id}>
                    {links.icon}
                    <a onClick={onDiscoverClick}>
                      {links.label} 
                      {dropdownActive 
                        ? <ArrowDropUpRoundedIcon style={iconStyle}/>
                        : <ArrowDropDownRoundedIcon style={iconStyle}/>
                      } 
                    </a>
                  </li>
                  {dropdownActive ? <DiscoverMenu /> : null}
                </>
              )
            }

            return <li key={links.id}>{links.icon}<a href={links.path}>{links.label}</a></li> 
          })
        }
      </ul>
    </div>
  )
}

export default Menu
