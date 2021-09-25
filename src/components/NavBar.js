import React, { useState } from 'react';
import navlinks from './navlinksConfig';
import SearchBar from './Search';

const NavBar = ({ active, setActive }) => {
  const [activeSearch, setActiveSearch] = useState(false)

  return (
    <header 
      style={
        {transform: `${active ? 'translateX(-150px)' : ''}`, paddingRight: `${active ? '0' : '2em'}`}
      }>
      <div className="navbar">
        <div className="navbar__left">
          <div className="navbar__left--logo">
            <img alt="logo" src="images/logo/logo_1.svg"/>
          </div>
        </div>

        <SearchBar activeSearch={activeSearch} setActiveSearch={setActiveSearch}/>
        
        <div className="navbar__right">
       
          <nav className='navbar__right--navbar'>
            <ul>
              {navlinks.map(links => {
                return <li 
                  key={links.label} 
                  onClick={() => {setActive(false)}}><a href={links.path}>{links.label}</a></li>
              })}
            </ul>
          </nav>

          <div className="search-icon" onClick={() => setActiveSearch(true)}>
            <i className="fas fa-search"></i>
          </div>

          <div className="burger" onClick={() => setActive(!active)}>
            <i className={`fas ${active ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </div>
      </div>      
    </header>
  )
}

export default NavBar
