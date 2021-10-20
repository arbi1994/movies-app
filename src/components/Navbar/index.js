import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//Material UI icons
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// Navlinks configuration
import navlinks from '../navlinksConfig';
//Components
import SearchBar from './Search/index';
import DiscoverMenu from './DiscoverMenu';
// import { ReactComponent as Logo } from 'images/logo/logo_1.svg';
import logo from '../../images/logo/logo_1.svg';

const NavBar = ({ active, setActive }) => {
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
      <header>
        <div className="navbar">
          <div className="navbar__left">
            <Link to='/' className="navbar__left--logo">
              <img alt="Logo" src={logo}/>
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
         
            <SearchRoundedIcon className="search-icon" onClick={() => setActiveSearch(true)}/>
          
            <div className="burger">
              <MenuRoundedIcon onClick={() => setActive(!active)} style={{ fontSize: 'clamp(2.4rem, 5vw, 3rem)'}}/>
            </div>
            
          </div>
        </div>      
      </header>
  )
}

export default NavBar
