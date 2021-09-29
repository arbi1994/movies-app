import React, { useState } from 'react';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { Link } from 'react-router-dom';

import navlinks from './navlinksConfig';
import SearchBar from './Search';
import DiscoverMenu from './DiscoverMenu';

const NavBar = () => {
  const [active, setActive] = useState(false)
  const [activeSearch, setActiveSearch] = useState(false)
  const [dropdownActive, setDropdownActive] = useState(false)

  const iconStyle = {
    fontSize: '2.4rem',
    color: '#f4f0fa',
    cursor: 'pointer'
  }

  const discoverLinkStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <>
      <header>
        <div className="navbar">
          <div className="navbar__left">
            <Link to='/' className="navbar__left--logo">
              <img alt="logo" src="images/logo/logo_1.svg"/>
            </Link>
          </div>

          <SearchBar activeSearch={activeSearch} setActiveSearch={setActiveSearch}/>
          
          <div className="navbar__right">
        
            <nav className='navbar__right--navbar'>
              <ul>
                {navlinks.map(links => {
                  if(links.label === "Discover"){
                    return (
                      <li 
                        key={links.label} 
                        onMouseOver={() => setDropdownActive(true)}
                        onMouseLeave={() => setDropdownActive(false)}
                        style={discoverLinkStyle}
                      >
                        <Link to={links.path}>{links.label}</Link>

                        {dropdownActive 
                          ? <ArrowDropUpRoundedIcon style={iconStyle}/>
                          : <ArrowDropDownRoundedIcon style={iconStyle}/>
                        }

                        {dropdownActive && <DiscoverMenu />}
                      </li>
                    )
                  }

                  return <li key={links.label} onClick={() => {setActive(false)}}>
                      <Link to={links.path}>{links.label}</Link>
                    </li>
                })}
              </ul>
            </nav>

            <div className="search-icon" onClick={() => setActiveSearch(true)}>
              <i className="fas fa-search"></i>
            </div>

            <div className="burger" onClick={() => setActive(!active)}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>      
      </header>
    </>
  )
}

export default NavBar
