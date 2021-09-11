import React, { useState } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import Menu from './Menu'
import '../sass/index.scss';
import useTmdb from '../hooks/useTmdb';
import { GET } from '../api_config';

const App = () => {
  let pageNum = 1;

  const [active, setActive] = useState(false);
  // const [home_data] = useTmdb(GET.discover, pageNum);

  // console.log(home_data) //MAIN component data
 
  return (
    <>
      <NavBar active={active} setActive={setActive}/>
      <Menu active={active} setActive={setActive} />
      <Main />
    </>
  )
}

export default App
