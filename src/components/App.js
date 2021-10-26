import React, { useState } from 'react';
// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Utils
import ScrollToTop from '../utils/ScrollToTop';
// Components
import NavBar from './Navbar/index';
import Menu from './Menu';
import Main from './Main/index';
import Cards from './Cards/index';
import Movie from './MovieDetails/index';
import About from './About/index';
import ScrollUpButton from './ScrollUpButton';
import Footer from './Footer';
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
          <Route path="/about" component={About} />
          <Route path="/*" component={NotFound} /> 
        </Switch>
      </ScrollToTop>
      <ScrollUpButton />
      <Footer />
    </Router> 
  )
}

export default App
