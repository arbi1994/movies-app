import React, { useState } from 'react';
// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Utils
import ScrollToTop from '../utils/ScrollToTop';
// Components
import NavBar from './NavBar';
import Menu from './Menu'
import Main from './Main';
import Movie from './MovieDetails/Movie';
import Cards from './Cards';
import NotFound from './NotFound';

// Styling
import '../sass/index.scss';

function App () {
  const [active, setActive] = useState(false)

  return(
    <Router>
      <NavBar active={active} setActive={setActive} />
      <Menu active={active} setActive={setActive} />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/discover/:path" component={Cards} />
          <Route path="/movie/:title/:id" component={Movie} /> 
          <Route path="/*" component={NotFound} /> 
        </Switch>
      </ScrollToTop>
    </Router> 
  )
}

export default App
