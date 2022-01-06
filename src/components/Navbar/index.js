import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
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
import logo from '../../images/logo/logo_1.svg';

const NavBar = ({ active, setActive, videoPlayerEl }) => {
  const match = useRouteMatch("/page-not-found")
  const [activeSearch, setActiveSearch] = useState(false)
  const [dropdownActive, setDropdownActive] = useState(false)
  const transition = useTransition(dropdownActive, {
    config: { duration: 150 },
    from: { opacity: 0, transform: 'translate3d(40px, 0px, 0)'},
    enter: { opacity: 1, transform: 'translate3d(60px, 15px, 0)', zIndex: 5},
    leave: { opacity: 0, transform: 'translate3d(40px, 0px, 0)', pointerEvents: 'none'},
  })

  const iconStyle = {
    fontSize: '2.4rem',
    color: '#f4f0fa',
    cursor: 'pointer'
  }

  const discoverLinkStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  useEffect(() => {
    if(videoPlayerEl === null) return
    if(dropdownActive && videoPlayerEl) videoPlayerEl.style.pointerEvents = 'none'

    return () => videoPlayerEl.style.removeProperty('pointer-events')
  }, [dropdownActive, videoPlayerEl])
 
  // check if pathname matches the 404 path
  if(match) return null

  return (
      <header>
        <div className="navbar">
          <div className="navbar__left">
            <Link to='/' title="Home" className="navbar__left--logo">
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

                        {transition((style, item) => 
                          item 
                            ? <animated.div style={style}>
                                <DiscoverMenu setActive={setActive} /> 
                              </animated.div> 
                            : null
                        )}
                      </li>
                    )
                  }

                  return <li key={links.label} title={links.label} onClick={() => {setActive(false)}}>
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

NavBar.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  videoPlayerEl: PropTypes.object,
}

export default NavBar
