import React, { useState } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import Menu from './Menu'
import '../sass/index.scss';

const App = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <NavBar active={active} setActive={setActive}/>
      <Menu active={active} setActive={setActive} />
      <Main />
    </>
  )
}

export default App
